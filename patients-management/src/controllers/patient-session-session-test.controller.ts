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
  SessionTest,
} from '../models';
import {PatientSessionRepository} from '../repositories';

export class PatientSessionSessionTestController {
  constructor(
    @repository(PatientSessionRepository) protected patientSessionRepository: PatientSessionRepository,
  ) { }

  @get('/patient-sessions/{id}/session-tests', {
    responses: {
      '200': {
        description: 'Array of PatientSession has many SessionTest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionTest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionTest>,
  ): Promise<SessionTest[]> {
    return this.patientSessionRepository.sessionTests(id).find(filter);
  }

  @post('/patient-sessions/{id}/session-tests', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTest)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PatientSession.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTest, {
            title: 'NewSessionTestInPatientSession',
            exclude: ['id'],
            optional: ['patientSessionId']
          }),
        },
      },
    }) sessionTest: Omit<SessionTest, 'id'>,
  ): Promise<SessionTest> {
    return this.patientSessionRepository.sessionTests(id).create(sessionTest);
  }

  @patch('/patient-sessions/{id}/session-tests', {
    responses: {
      '200': {
        description: 'PatientSession.SessionTest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTest, {partial: true}),
        },
      },
    })
    sessionTest: Partial<SessionTest>,
    @param.query.object('where', getWhereSchemaFor(SessionTest)) where?: Where<SessionTest>,
  ): Promise<Count> {
    return this.patientSessionRepository.sessionTests(id).patch(sessionTest, where);
  }

  @del('/patient-sessions/{id}/session-tests', {
    responses: {
      '200': {
        description: 'PatientSession.SessionTest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionTest)) where?: Where<SessionTest>,
  ): Promise<Count> {
    return this.patientSessionRepository.sessionTests(id).delete(where);
  }
}
