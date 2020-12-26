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
  SessionTreatmentEquipment,
} from '../models';
import {SessionTreatmentRepository} from '../repositories';

export class SessionTreatmentSessionTreatmentEquipmentController {
  constructor(
    @repository(SessionTreatmentRepository) protected sessionTreatmentRepository: SessionTreatmentRepository,
  ) { }

  @get('/session-treatments/{id}/session-treatment-equipments', {
    responses: {
      '200': {
        description: 'Array of SessionTreatment has many SessionTreatmentEquipment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionTreatmentEquipment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionTreatmentEquipment>,
  ): Promise<SessionTreatmentEquipment[]> {
    return this.sessionTreatmentRepository.sessionTreatmentEquipments(id).find(filter);
  }

  @post('/session-treatments/{id}/session-treatment-equipments', {
    responses: {
      '200': {
        description: 'SessionTreatment model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTreatmentEquipment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionTreatment.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatmentEquipment, {
            title: 'NewSessionTreatmentEquipmentInSessionTreatment',
            exclude: ['id'],
            optional: ['sessionTreatmentId']
          }),
        },
      },
    }) sessionTreatmentEquipment: Omit<SessionTreatmentEquipment, 'id'>,
  ): Promise<SessionTreatmentEquipment> {
    return this.sessionTreatmentRepository.sessionTreatmentEquipments(id).create(sessionTreatmentEquipment);
  }

  @patch('/session-treatments/{id}/session-treatment-equipments', {
    responses: {
      '200': {
        description: 'SessionTreatment.SessionTreatmentEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatmentEquipment, {partial: true}),
        },
      },
    })
    sessionTreatmentEquipment: Partial<SessionTreatmentEquipment>,
    @param.query.object('where', getWhereSchemaFor(SessionTreatmentEquipment)) where?: Where<SessionTreatmentEquipment>,
  ): Promise<Count> {
    return this.sessionTreatmentRepository.sessionTreatmentEquipments(id).patch(sessionTreatmentEquipment, where);
  }

  @del('/session-treatments/{id}/session-treatment-equipments', {
    responses: {
      '200': {
        description: 'SessionTreatment.SessionTreatmentEquipment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionTreatmentEquipment)) where?: Where<SessionTreatmentEquipment>,
  ): Promise<Count> {
    return this.sessionTreatmentRepository.sessionTreatmentEquipments(id).delete(where);
  }
}
