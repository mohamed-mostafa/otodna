import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {UserType} from '../models';
import {UserTypeRepository} from '../repositories';
import { OPERATION_SECURITY_SPEC } from '../utils/security.spec';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class UserTypeController {
  constructor(
    @repository(UserTypeRepository)
    public userTypeRepository : UserTypeRepository,
  ) {}

 @get('/user-types/count', {
  security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'UserType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserType) where?: Where<UserType>,
  ): Promise<Count> {
    return this.userTypeRepository.count(where);
  }

  @get('/user-types', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of UserType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserType) filter?: Filter<UserType>,
  ): Promise<UserType[]> {
    return this.userTypeRepository.find(filter);
  }
}
