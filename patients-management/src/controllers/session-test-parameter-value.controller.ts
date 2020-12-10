import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SessionTest,
  ParameterValue,
} from '../models';
import {SessionTestRepository} from '../repositories';

export class SessionTestParameterValueController {
  constructor(
    @repository(SessionTestRepository) protected sessionTestRepository: SessionTestRepository,
  ) { }

  @get('/session-tests/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'Array of SessionTest has many ParameterValue',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ParameterValue)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ParameterValue>,
  ): Promise<ParameterValue[]> {
    return this.sessionTestRepository.parameterValues(id).find(filter);
  }

  @post('/session-tests/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'SessionTest model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParameterValue)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionTest.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParameterValue, {
            title: 'NewParameterValueInSessionTest',
            exclude: ['id'],
            optional: ['sessionTestId']
          }),
        },
      },
    }) parameterValue: Omit<ParameterValue, 'id'>,
  ): Promise<ParameterValue> {
    return this.sessionTestRepository.parameterValues(id).create(parameterValue);
  }

  @patch('/session-tests/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'SessionTest.ParameterValue PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParameterValue, {partial: true}),
        },
      },
    })
    parameterValue: Partial<ParameterValue>,
    @param.query.object('where', getWhereSchemaFor(ParameterValue)) where?: Where<ParameterValue>,
  ): Promise<Count> {
    return this.sessionTestRepository.parameterValues(id).patch(parameterValue, where);
  }

  @del('/session-tests/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'SessionTest.ParameterValue DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ParameterValue)) where?: Where<ParameterValue>,
  ): Promise<Count> {
    return this.sessionTestRepository.parameterValues(id).delete(where);
  }
}
