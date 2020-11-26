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
  PatientSession,
  SessionTreatment,
} from '../models';
import {PatientSessionRepository} from '../repositories';

export class PatientSessionSessionTreatmentController {
  constructor(
    @repository(PatientSessionRepository) protected patientSessionRepository: PatientSessionRepository,
  ) { }

  @get('/patient-sessions/{id}/session-treatments', {
    responses: {
      '200': {
        description: 'Array of PatientSession has many SessionTreatment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionTreatment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionTreatment>,
  ): Promise<SessionTreatment[]> {
    return this.patientSessionRepository.sessionTreatments(id).find(filter);
  }

  @post('/patient-sessions/{id}/session-treatments', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTreatment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PatientSession.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatment, {
            title: 'NewSessionTreatmentInPatientSession',
            exclude: ['id'],
            optional: ['patientSessionId']
          }),
        },
      },
    }) sessionTreatment: Omit<SessionTreatment, 'id'>,
  ): Promise<SessionTreatment> {
    return this.patientSessionRepository.sessionTreatments(id).create(sessionTreatment);
  }

  @patch('/patient-sessions/{id}/session-treatments', {
    responses: {
      '200': {
        description: 'PatientSession.SessionTreatment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatment, {partial: true}),
        },
      },
    })
    sessionTreatment: Partial<SessionTreatment>,
    @param.query.object('where', getWhereSchemaFor(SessionTreatment)) where?: Where<SessionTreatment>,
  ): Promise<Count> {
    return this.patientSessionRepository.sessionTreatments(id).patch(sessionTreatment, where);
  }

  @del('/patient-sessions/{id}/session-treatments', {
    responses: {
      '200': {
        description: 'PatientSession.SessionTreatment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionTreatment)) where?: Where<SessionTreatment>,
  ): Promise<Count> {
    return this.patientSessionRepository.sessionTreatments(id).delete(where);
  }
}
