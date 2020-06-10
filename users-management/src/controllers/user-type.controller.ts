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

export class UserTypeController {
  constructor(
    @repository(UserTypeRepository)
    public userTypeRepository : UserTypeRepository,
  ) {}

 @get('/user-types/count', {
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
