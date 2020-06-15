// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {HttpErrors} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../models/user.model';
import {UserService} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import {repository} from '@loopback/repository';
import {PasswordHasher} from './hash.password.bcryptjs';
import {PasswordHasherBindings} from '../keys';
import {inject} from '@loopback/context';
import { Credentials, LoggedInUser } from '../models';

export class OtodnaUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Incorrect username or password.';
    const suspendedUserError = 'User is suspended. Contact the system administrator.';
    const pendinApprovalUserError = 'User is pending approval. Contact the system administrator.';

    const foundUser = await this.userRepository.findOne({
      where: {username: credentials.username}, include: [{relation: "userType"}, {relation: "role"}],
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    if (!foundUser.active) {
      throw new HttpErrors.Unauthorized(suspendedUserError);
    }

    if (!foundUser.approved) {
      throw new HttpErrors.Unauthorized(pendinApprovalUserError);
    }

    return foundUser;
  }

  convertToUserProfile(user: User): LoggedInUser {
    const userProfile = {
      [securityId]: user.id.toString(),
      id: user.id,
      name: user.username,
      email: user.emailAddress,
      fullName: user.fullName,
      role: user.role,
      type: user.userType
    };

    return userProfile;
  }
}