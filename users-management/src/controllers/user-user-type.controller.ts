import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  UserType,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserTypeController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-type', {
    responses: {
      '200': {
        description: 'UserType belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserType)},
          },
        },
      },
    },
  })
  async getUserType(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<UserType> {
    return this.userRepository.userType(id);
  }
}
