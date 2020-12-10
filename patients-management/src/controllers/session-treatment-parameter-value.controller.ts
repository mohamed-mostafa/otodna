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
  SessionTreatment,
  ParameterValue,
} from '../models';
import {SessionTreatmentRepository} from '../repositories';

export class SessionTreatmentParameterValueController {
  constructor(
    @repository(SessionTreatmentRepository) protected sessionTreatmentRepository: SessionTreatmentRepository,
  ) { }

  @get('/session-treatments/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'Array of SessionTreatment has many ParameterValue',
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
    return this.sessionTreatmentRepository.parameterValues(id).find(filter);
  }

  @post('/session-treatments/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'SessionTreatment model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParameterValue)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionTreatment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParameterValue, {
            title: 'NewParameterValueInSessionTreatment',
            exclude: ['id'],
            optional: ['sessionTreatmentId']
          }),
        },
      },
    }) parameterValue: Omit<ParameterValue, 'id'>,
  ): Promise<ParameterValue> {
    return this.sessionTreatmentRepository.parameterValues(id).create(parameterValue);
  }

  @patch('/session-treatments/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'SessionTreatment.ParameterValue PATCH success count',
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
    return this.sessionTreatmentRepository.parameterValues(id).patch(parameterValue, where);
  }

  @del('/session-treatments/{id}/parameter-values', {
    responses: {
      '200': {
        description: 'SessionTreatment.ParameterValue DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ParameterValue)) where?: Where<ParameterValue>,
  ): Promise<Count> {
    return this.sessionTreatmentRepository.parameterValues(id).delete(where);
  }
}
