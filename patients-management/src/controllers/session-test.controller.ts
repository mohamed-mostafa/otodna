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
import {SessionTest, TestsCountByDepartment} from '../models';
import {SessionTestRepository, TestsCountByDepartmentRepository} from '../repositories';

export class SessionTestController {
  constructor(
    @repository(SessionTestRepository)
    public sessionTestRepository: SessionTestRepository,
    @repository(TestsCountByDepartmentRepository)
    public testsCountByDepartmentRepository: TestsCountByDepartmentRepository
  ) {}

  @post('/session-tests', {
    responses: {
      '200': {
        description: 'SessionTest model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTest, {
            title: 'NewSessionTest',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionTest: Omit<SessionTest, 'id'>,
  ): Promise<SessionTest> {
    return this.sessionTestRepository.create(sessionTest);
  }

  @get('/session-tests/count', {
    responses: {
      '200': {
        description: 'SessionTest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionTest) where?: Where<SessionTest>,
  ): Promise<Count> {
    return this.sessionTestRepository.count(where);
  }

  @get('/session-tests', {
    responses: {
      '200': {
        description: 'Array of SessionTest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionTest) filter?: Filter<SessionTest>,
  ): Promise<SessionTest[]> {
    return this.sessionTestRepository.find(filter);
  }

  @patch('/session-tests', {
    responses: {
      '200': {
        description: 'SessionTest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTest, {partial: true}),
        },
      },
    })
    sessionTest: SessionTest,
    @param.where(SessionTest) where?: Where<SessionTest>,
  ): Promise<Count> {
    return this.sessionTestRepository.updateAll(sessionTest, where);
  }

  @get('/session-tests/{id}', {
    responses: {
      '200': {
        description: 'SessionTest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionTest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionTest, {exclude: 'where'})
    filter?: FilterExcludingWhere<SessionTest>,
  ): Promise<SessionTest> {
    return this.sessionTestRepository.findById(id, filter);
  }

  @get('/frequentlyUsedTests/{id}', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TestsCountByDepartment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async getFrequentlyUsedTests(
    @param.path.number('id') id: number,
  ): Promise<TestsCountByDepartment[]> {
    return this.testsCountByDepartmentRepository.find({where: {departmentId: id}, order: ["count desc"]})
  }

  @patch('/session-tests/{id}', {
    responses: {
      '204': {
        description: 'SessionTest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTest, {partial: true}),
        },
      },
    })
    sessionTest: SessionTest,
  ): Promise<void> {
    await this.sessionTestRepository.updateById(id, sessionTest);
  }

  @put('/session-tests/{id}', {
    responses: {
      '204': {
        description: 'SessionTest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionTest: SessionTest,
  ): Promise<void> {
    await this.sessionTestRepository.replaceById(id, sessionTest);
  }

  @del('/session-tests/{id}', {
    responses: {
      '204': {
        description: 'SessionTest DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionTestRepository.deleteById(id);
  }
}
