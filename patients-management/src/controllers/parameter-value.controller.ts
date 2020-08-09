import {SessionTest} from './../models/session-test.model';
import {SessionTestRepository} from './../repositories/session-test.repository';
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
import {ParameterValue} from '../models';
import {ParameterValueRepository} from '../repositories';

export class ParameterValueController {
  constructor(
    @repository(ParameterValueRepository)
    public parameterValueRepository: ParameterValueRepository,
    @repository(SessionTestRepository)
    private sessionTestRepository: SessionTestRepository,
  ) {}

  @post('/parameterValue', {
    responses: {
      '200': {
        description: 'ParameterValue model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(ParameterValue)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParameterValue, {
            title: 'NewParameterValue',
            exclude: ['id'],
          }),
        },
      },
    })
    parameterValue: Omit<ParameterValue, 'id'>,
  ): Promise<ParameterValue> {
    return this.parameterValueRepository.create(parameterValue);
  }
  @post('/parametersValues', {
    responses: {
      '200': {
        description: 'parametersValues model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParameterValue),
          },
        },
      },
    },
  })
  async createParametersValues(
    @requestBody() data: Array<Object>,
  ): Promise<any> {
    return this.parameterValueRepository.createParametersValues(data);
  }
  @put('/parametersValues', {
    responses: {
      '200': {
        description: 'parametersValues model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParameterValue),
          },
        },
      },
    },
  })
  async updateParametersValues(
    @requestBody() data: Array<Object>,
  ): Promise<any> {
    return this.parameterValueRepository.updateParametersValues(data);
  }
  @get('/parameterValue/count', {
    responses: {
      '200': {
        description: 'ParameterValue model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ParameterValue) where?: Where<ParameterValue>,
  ): Promise<Count> {
    return this.parameterValueRepository.count(where);
  }

  @get('/parameterValue', {
    responses: {
      '200': {
        description: 'Array of ParameterValue model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ParameterValue, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ParameterValue) filter?: Filter<ParameterValue>,
  ): Promise<ParameterValue[]> {
    return this.parameterValueRepository.find(filter);
  }
  @get('/sessionTests', {
    responses: {
      '200': {
        description: 'Array of sessionTests model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTest, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findSessionTests(
    @param.filter(SessionTest) filter?: Filter<SessionTest>,
  ): Promise<SessionTest[]> {
    return this.sessionTestRepository.find(filter);
  }
  @patch('/parameterValue', {
    responses: {
      '200': {
        description: 'ParameterValue PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParameterValue, {partial: true}),
        },
      },
    })
    parameterValue: ParameterValue,
    @param.where(ParameterValue) where?: Where<ParameterValue>,
  ): Promise<Count> {
    return this.parameterValueRepository.updateAll(parameterValue, where);
  }

  @get('/parameterValue/{id}', {
    responses: {
      '200': {
        description: 'ParameterValue model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParameterValue, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParameterValue, {exclude: 'where'})
    filter?: FilterExcludingWhere<ParameterValue>,
  ): Promise<ParameterValue> {
    return this.parameterValueRepository.findById(id, filter);
  }

  @patch('/parameterValue/{id}', {
    responses: {
      '204': {
        description: 'ParameterValue PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParameterValue, {partial: true}),
        },
      },
    })
    parameterValue: ParameterValue,
  ): Promise<void> {
    await this.parameterValueRepository.updateById(id, parameterValue);
  }

  @put('/parameterValue/{id}', {
    responses: {
      '204': {
        description: 'ParameterValue PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parameterValue: ParameterValue,
  ): Promise<void> {
    await this.parameterValueRepository.replaceById(id, parameterValue);
  }

  @del('/parameterValue/{id}', {
    responses: {
      '204': {
        description: 'ParameterValue DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parameterValueRepository.deleteById(id);
  }
}
