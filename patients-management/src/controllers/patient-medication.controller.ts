import {MedicationStatus} from './../models/medication-status.model';
import {MedicationStatusRepository} from './../repositories/medication-status.repository';
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
import {PatientMedication} from '../models';
import {PatientMedicationRepository} from '../repositories';

export class PatientMedicationController {
  constructor(
    @repository(PatientMedicationRepository)
    public patientMedicationRepository: PatientMedicationRepository,
    @repository(MedicationStatusRepository)
    public medicationStatusRepository: MedicationStatusRepository,
  ) {}

  @post('/patientMedication', {
    responses: {
      '200': {
        description: 'PatientMedication model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientMedication)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientMedication, {
            title: 'NewPatientMedication',
            exclude: ['id'],
          }),
        },
      },
    })
    patientMedication: Omit<PatientMedication, 'id'>,
  ): Promise<PatientMedication> {
    return this.patientMedicationRepository.create(patientMedication);
  }

  @get('/patientMedication/count', {
    responses: {
      '200': {
        description: 'PatientMedication model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientMedication) where?: Where<PatientMedication>,
  ): Promise<Count> {
    return this.patientMedicationRepository.count(where);
  }

  @get('/patientMedication', {
    responses: {
      '200': {
        description: 'Array of PatientMedication model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientMedication, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientMedication) filter?: Filter<PatientMedication>,
  ): Promise<PatientMedication[]> {
    return this.patientMedicationRepository.find(filter);
  }

  @get('/patientMedication/statuses', {
    responses: {
      '200': {
        description: 'Array of PatientMedication model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MedicationStatus, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findMedicationStatus(
    @param.filter(MedicationStatus) filter?: Filter<MedicationStatus>,
  ): Promise<MedicationStatus[]> {
    return this.medicationStatusRepository.find(filter);
  }

  @patch('/patientMedication', {
    responses: {
      '200': {
        description: 'PatientMedication PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientMedication, {partial: true}),
        },
      },
    })
    patientMedication: PatientMedication,
    @param.where(PatientMedication) where?: Where<PatientMedication>,
  ): Promise<Count> {
    return this.patientMedicationRepository.updateAll(patientMedication, where);
  }

  @get('/patientMedication/{id}', {
    responses: {
      '200': {
        description: 'PatientMedication model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientMedication, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientMedication, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientMedication>,
  ): Promise<PatientMedication> {
    return this.patientMedicationRepository.findById(id, filter);
  }

  @get('/patientMedication/statuses/{id}', {
    responses: {
      '200': {
        description: 'PatientMedication model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MedicationStatus, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findMedicationStatusById(
    @param.path.number('id') id: number,
    @param.filter(MedicationStatus, {exclude: 'where'})
    filter?: FilterExcludingWhere<MedicationStatus>,
  ): Promise<MedicationStatus> {
    return this.medicationStatusRepository.findById(id, filter);
  }

  @patch('/patientMedication/{id}', {
    responses: {
      '204': {
        description: 'PatientMedication PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientMedication, {partial: true}),
        },
      },
    })
    patientMedication: PatientMedication,
  ): Promise<void> {
    await this.patientMedicationRepository.updateById(id, patientMedication);
  }

  @put('/patientMedication/{id}', {
    responses: {
      '204': {
        description: 'PatientMedication PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientMedication: PatientMedication,
  ): Promise<void> {
    await this.patientMedicationRepository.replaceById(id, patientMedication);
  }

  @del('/patientMedication/{id}', {
    responses: {
      '204': {
        description: 'PatientMedication DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientMedicationRepository.deleteById(id);
  }
}
