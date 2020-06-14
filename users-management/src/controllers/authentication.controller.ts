import {repository, Where} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {User, Credentials, LoggedInUser} from '../models';
import {UserRepository} from '../repositories';
import {TokenService} from '@loopback/authentication';
import {OtodnaUserService} from '../services/user.service';
import {service, inject} from '@loopback/core';
import {validateCredentials} from '../services/validator.service';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {PasswordHasherBindings, TokenServiceBindings} from '../keys';

export class AuthenticationController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(OtodnaUserService)
    public userService: OtodnaUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: TokenService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  @get('/verifyToken/{token}', {
    responses: {
      '200': {
        description:
          'An object representing the logged in user, including the access token',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LoggedInUser),
          },
        },
      },
    },
  })
  async verifyToken(
    @param.path.string('token') token: string,
  ): Promise<LoggedInUser> {
    return this.tokenService.verifyToken(token);
  }

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUser: User,
  ): Promise<User> {
    // ensure a valid username value and password value
    let credentials: Credentials = new Credentials();
    credentials.password = newUser.password;
    credentials.username = newUser.username;
    validateCredentials(credentials);

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(newUser.password);
    // create the new user
    newUser.password = password;
    newUser.approved = false;
    // newUser.userTypeId = 1; // regular user
    let savedUser = await this.userRepository.create(newUser);
    delete savedUser.password;
    return savedUser;
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LoggedInUser),
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'The input of login function',
      required: true,
      content: {
        'application/json': {schema: getModelSchemaRef(Credentials)},
      },
    })
    credentials: Credentials,
  ): Promise<LoggedInUser> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.tokenService.generateToken(userProfile);
    const loggedInUser: LoggedInUser = userProfile;
    loggedInUser.token = token;
    return loggedInUser;
  }
}
