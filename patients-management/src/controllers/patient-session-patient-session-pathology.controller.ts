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
  PatientSessionPathology,
} from '../models';
import {PatientSessionRepository} from '../repositories';

export class PatientSessionPatientSessionPathologyController {
  constructor(
    @repository(PatientSessionRepository) protected patientSessionRepository: PatientSessionRepository,
  ) { }

  @get('/patient-sessions/{id}/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'Array of PatientSession has many PatientSessionPathology',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PatientSessionPathology)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PatientSessionPathology>,
  ): Promise<PatientSessionPathology[]> {
    return this.patientSessionRepository.patientSessionPathologies(id).find(filter);
  }

  @post('/patient-sessions/{id}/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {'application/json': {schema: getModelSchemaRef(PatientSessionPathology)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PatientSession.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSessionPathology, {
            title: 'NewPatientSessionPathologyInPatientSession',
            exclude: ['id'],
            optional: ['patientSessionId']
          }),
        },
      },
    }) patientSessionPathology: Omit<PatientSessionPathology, 'id'>,
  ): Promise<PatientSessionPathology> {
    return this.patientSessionRepository.patientSessionPathologies(id).create(patientSessionPathology);
  }

  @patch('/patient-sessions/{id}/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'PatientSession.PatientSessionPathology PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSessionPathology, {partial: true}),
        },
      },
    })
    patientSessionPathology: Partial<PatientSessionPathology>,
    @param.query.object('where', getWhereSchemaFor(PatientSessionPathology)) where?: Where<PatientSessionPathology>,
  ): Promise<Count> {
    return this.patientSessionRepository.patientSessionPathologies(id).patch(patientSessionPathology, where);
  }

  @del('/patient-sessions/{id}/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'PatientSession.PatientSessionPathology DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PatientSessionPathology)) where?: Where<PatientSessionPathology>,
  ): Promise<Count> {
    return this.patientSessionRepository.patientSessionPathologies(id).delete(where);
  }
}
