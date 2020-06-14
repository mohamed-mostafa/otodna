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
import {Department} from '../models';
import {DepartmentRepository} from '../repositories';
import {OPERATION_SECURITY_SPEC} from '../utils/security.spec';
import {authenticate} from '@loopback/authentication';

// @authenticate('jwt')
export class DepartmentController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) {}

  @get('/departments/count', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Department model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.count(where);
  }

  @get('/departments', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Department model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Department, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Department) filter?: Filter<Department>,
  ): Promise<Department[]> {
    return this.departmentRepository.find(filter);
  }
}
