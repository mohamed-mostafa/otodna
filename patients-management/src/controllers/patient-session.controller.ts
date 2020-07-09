import {PatientDiagnosisSymptomsRepository} from './../repositories/patient-diagnosis-symptoms.repository';
import {PatientDiagnosisSymptoms} from './../models/patient-diagnosis-symptoms.model';
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
import {PatientSession} from '../models';
import {PatientSessionRepository} from '../repositories';

export class PatientSessionController {
  constructor(
    @repository(PatientSessionRepository)
    public patientSessionRepository: PatientSessionRepository,
    @repository(PatientDiagnosisSymptomsRepository)
    public patientDiagnosisSymptomsRepository: PatientDiagnosisSymptomsRepository,
  ) {}

  @post('/patientSession', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientSession)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSession, {
            title: 'NewPatientSession',
            exclude: ['id'],
          }),
        },
      },
    })
    patientSession: Omit<PatientSession, 'id'>,
  ): Promise<PatientSession> {
    return this.patientSessionRepository.create(patientSession);
  }

  @get('/patientSession/count', {
    responses: {
      '200': {
        description: 'PatientSession model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientSession) where?: Where<PatientSession>,
  ): Promise<Count> {
    return this.patientSessionRepository.count(where);
  }

  @get('/patientSession', {
    responses: {
      '200': {
        description: 'Array of PatientSession model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientSession, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientSession) filter?: Filter<PatientSession>,
  ): Promise<PatientSession[]> {
    return this.patientSessionRepository.find(filter);
  }

  @get('/patientDiagnosisSymptoms', {
    responses: {
      '200': {
        description: 'Array of PatientDiagnosisSymptoms model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientDiagnosisSymptoms, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findSymptoms(
    @param.filter(PatientDiagnosisSymptoms)
    filter?: Filter<PatientDiagnosisSymptoms>,
  ): Promise<PatientDiagnosisSymptoms[]> {
    return this.patientDiagnosisSymptomsRepository.find(filter);
  }

  @patch('/patientSession', {
    responses: {
      '200': {
        description: 'PatientSession PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSession, {partial: true}),
        },
      },
    })
    patientSession: PatientSession,
    @param.where(PatientSession) where?: Where<PatientSession>,
  ): Promise<Count> {
    return this.patientSessionRepository.updateAll(patientSession, where);
  }

  @get('/patientSession/{id}', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientSession, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientSession, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientSession>,
  ): Promise<PatientSession> {
    return this.patientSessionRepository.findById(id, filter);
  }

  @patch('/patientSession/{id}', {
    responses: {
      '204': {
        description: 'PatientSession PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSession, {partial: true}),
        },
      },
    })
    patientSession: PatientSession,
  ): Promise<void> {
    await this.patientSessionRepository.updateById(id, patientSession);
  }

  @put('/patientSession/{id}', {
    responses: {
      '204': {
        description: 'PatientSession PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientSession: PatientSession,
  ): Promise<void> {
    await this.patientSessionRepository.replaceById(id, patientSession);
  }

  @del('/patientSession/{id}', {
    responses: {
      '204': {
        description: 'PatientSession DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientSessionRepository.deleteById(id);
  }
}
