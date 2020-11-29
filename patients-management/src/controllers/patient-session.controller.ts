import {PatientTagsService} from './../services/patient-tags.service';
import {service} from '@loopback/core';
import {SessionTestEquipment} from './../models/session-test-equipment.model';
import {SessionTestEquipmentRepository} from './../repositories/session-test-equipment.repository';
import {PatientSessionSymptom} from './../models/patient-session-symptom.model';
import {PatientSessionSymptomRepository} from './../repositories/patient-session-symptom.repository';
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
    @repository(PatientSessionSymptomRepository)
    public patientSessionSymptomRepository: PatientSessionSymptomRepository,
    @repository(SessionTestEquipmentRepository)
    public sessionTestEquipmentRepository: SessionTestEquipmentRepository,
    @service(PatientTagsService) public patientTagsService: PatientTagsService,
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

  @post('/patientSessionSymptoms', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientSessionSymptom),
          },
        },
      },
    },
  })
  async createDiagnosisSymptom(
    @requestBody() data: Array<Object>,
  ): Promise<any> {
    return this.patientSessionSymptomRepository.createDiagnosisSymptom(data);
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

  @get('/sessionTestEquipment', {
    responses: {
      '200': {
        description: 'Array of SessionTestEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTestEquipment, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findSessionTestEquipment(
    @param.filter(SessionTestEquipment) filter?: Filter<SessionTestEquipment>,
  ): Promise<SessionTestEquipment[]> {
    return this.sessionTestEquipmentRepository.find(filter);
  }

  @get('/patientSessionSymptoms', {
    responses: {
      '200': {
        description: 'Array of PatientSessionSymptom model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientSessionSymptom, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findSessionSymptoms(
    @param.filter(PatientSessionSymptom)
    filter?: Filter<PatientSessionSymptom>,
  ): Promise<PatientSessionSymptom[]> {
    return this.patientSessionSymptomRepository.find(filter);
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

  @get('/patientTags/{id}', {
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
  async getPatientTags(
    @param.path.number('id') id: number,
  ): Promise<PatientSession> {
    return this.patientTagsService.getPatientTags(id);
  }

  @get('/getSessionsDiseasesAndRecommendation/{id}', {
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
  async getSessionsDiseasesAndRecommendation(
    @param.path.number('id') id: number,
  ): Promise<PatientSession> {
    return this.patientSessionRepository.getSessionsDiseasesAndRecommendation(
      id,
    );
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
  @patch('/patientSessionSymptoms/{id}', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientSessionSymptom),
          },
        },
      },
    },
  })
  async updateDiagnosisSymptoms(
    @param.path.number('id') id: number,
    @requestBody() data: Array<Object>,
  ): Promise<any> {
    return this.patientSessionSymptomRepository.updateDiagnosisSymptoms(
      id,
      data,
    );
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
