import {VitalRecordType} from './../models/vital-record-type.model';
import {VitalRecordTypeRepository} from './../repositories/vital-record-type.repository';
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
import {PatientVitalRecord} from '../models';
import {PatientVitalRecordRepository} from '../repositories';

export class PatientVitalController {
  constructor(
    @repository(PatientVitalRecordRepository)
    public patientVitalRecordRepository: PatientVitalRecordRepository,
    @repository(VitalRecordTypeRepository)
    public vitalRecordTypeRepository: VitalRecordTypeRepository,
  ) {}

  @post('/patientVital', {
    responses: {
      '200': {
        description: 'PatientVitalRecord model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientVitalRecord)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientVitalRecord, {
            title: 'NewPatientVitalRecord',
            exclude: ['id'],
          }),
        },
      },
    })
    patientVitalRecord: Omit<PatientVitalRecord, 'id'>,
  ): Promise<PatientVitalRecord> {
    return this.patientVitalRecordRepository.create(patientVitalRecord);
  }

  @get('/patientVital/count', {
    responses: {
      '200': {
        description: 'PatientVitalRecord model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientVitalRecord) where?: Where<PatientVitalRecord>,
  ): Promise<Count> {
    return this.patientVitalRecordRepository.count(where);
  }

  @get('/patientVital', {
    responses: {
      '200': {
        description: 'Array of PatientVitalRecord model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientVitalRecord, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientVitalRecord) filter?: Filter<PatientVitalRecord>,
  ): Promise<PatientVitalRecord[]> {
    return this.patientVitalRecordRepository.find(filter);
  }

  @get('/patientVital/recordTypes', {
    responses: {
      '200': {
        description: 'Array of PatientVitalRecord model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VitalRecordType, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findVitalRecordType(
    @param.filter(VitalRecordType) filter?: Filter<VitalRecordType>,
  ): Promise<VitalRecordType[]> {
    return this.vitalRecordTypeRepository.find(filter);
  }

  @patch('/patientVital', {
    responses: {
      '200': {
        description: 'PatientVitalRecord PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientVitalRecord, {partial: true}),
        },
      },
    })
    patientVitalRecord: PatientVitalRecord,
    @param.where(PatientVitalRecord) where?: Where<PatientVitalRecord>,
  ): Promise<Count> {
    return this.patientVitalRecordRepository.updateAll(
      patientVitalRecord,
      where,
    );
  }

  @get('/patientVital/recordTypes/{id}', {
    responses: {
      '200': {
        description: 'PatientVitalRecord model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VitalRecordType, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findVitalRecordTypeById(
    @param.path.number('id') id: number,
    @param.filter(VitalRecordType, {exclude: 'where'})
    filter?: FilterExcludingWhere<VitalRecordType>,
  ): Promise<VitalRecordType> {
    return this.vitalRecordTypeRepository.findById(id, filter);
  }

  @get('/patientVital/{id}', {
    responses: {
      '200': {
        description: 'PatientVitalRecord model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientVitalRecord, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientVitalRecord, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientVitalRecord>,
  ): Promise<PatientVitalRecord> {
    return this.patientVitalRecordRepository.findById(id, filter);
  }

  @patch('/patientVital/{id}', {
    responses: {
      '204': {
        description: 'PatientVitalRecord PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientVitalRecord, {partial: true}),
        },
      },
    })
    patientVitalRecord: PatientVitalRecord,
  ): Promise<void> {
    await this.patientVitalRecordRepository.updateById(id, patientVitalRecord);
  }

  @put('/patientVital/{id}', {
    responses: {
      '204': {
        description: 'PatientVitalRecord PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientVitalRecord: PatientVitalRecord,
  ): Promise<void> {
    await this.patientVitalRecordRepository.replaceById(id, patientVitalRecord);
  }

  @del('/patientVital/{id}', {
    responses: {
      '204': {
        description: 'PatientVitalRecord DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientVitalRecordRepository.deleteById(id);
  }
}
