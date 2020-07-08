import {PatientDiagnosisSymptoms} from './../models/patient-diagnosis-symptoms.model';
import {PatientDiagnosisSymptomsRepository} from './../repositories/patient-diagnosis-symptoms.repository';
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
import {PatientDiagnosisBasicInfo} from '../models/patient-diagnosis-basic-info.model';
import {PatientDiagnosisBasicInfoRepository} from '../repositories/patient-diagnosis-basic-info.repository';

export class PatientDiagnosisBasicInfoController {
  constructor(
    @repository(PatientDiagnosisBasicInfoRepository)
    public patientDiagnosisBasicInfoRepository: PatientDiagnosisBasicInfoRepository,
    @repository(PatientDiagnosisSymptomsRepository)
    public patientDiagnosisSymptomsRepository: PatientDiagnosisSymptomsRepository,
  ) {}

  @post('/patientDiagnosisBasicInfo', {
    responses: {
      '200': {
        description: 'PatientDiagnosisBasicInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientDiagnosisBasicInfo),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientDiagnosisBasicInfo, {
            title: 'NewPatientDiagnosisBasicInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    patientDiagnosisBasicInfo: Omit<PatientDiagnosisBasicInfo, 'id'>,
  ): Promise<PatientDiagnosisBasicInfo> {
    return this.patientDiagnosisBasicInfoRepository.create(
      patientDiagnosisBasicInfo,
    );
  }

  @get('/patientDiagnosisBasicInfo/count', {
    responses: {
      '200': {
        description: 'PatientDiagnosisBasicInfo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientDiagnosisBasicInfo)
    where?: Where<PatientDiagnosisBasicInfo>,
  ): Promise<Count> {
    return this.patientDiagnosisBasicInfoRepository.count(where);
  }

  @get('/patientDiagnosisBasicInfo', {
    responses: {
      '200': {
        description: 'Array of PatientDiagnosisBasicInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientDiagnosisBasicInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientDiagnosisBasicInfo)
    filter?: Filter<PatientDiagnosisBasicInfo>,
  ): Promise<PatientDiagnosisBasicInfo[]> {
    return this.patientDiagnosisBasicInfoRepository.find(filter);
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

  @patch('/patientDiagnosisBasicInfo', {
    responses: {
      '200': {
        description: 'PatientDiagnosisBasicInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientDiagnosisBasicInfo, {partial: true}),
        },
      },
    })
    patientDiagnosisBasicInfo: PatientDiagnosisBasicInfo,
    @param.where(PatientDiagnosisBasicInfo)
    where?: Where<PatientDiagnosisBasicInfo>,
  ): Promise<Count> {
    return this.patientDiagnosisBasicInfoRepository.updateAll(
      patientDiagnosisBasicInfo,
      where,
    );
  }

  @get('/patientDiagnosisBasicInfo/{id}', {
    responses: {
      '200': {
        description: 'PatientDiagnosisBasicInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientDiagnosisBasicInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientDiagnosisBasicInfo, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientDiagnosisBasicInfo>,
  ): Promise<PatientDiagnosisBasicInfo> {
    return this.patientDiagnosisBasicInfoRepository.findById(id, filter);
  }

  @patch('/patientDiagnosisBasicInfo/{id}', {
    responses: {
      '204': {
        description: 'PatientDiagnosisBasicInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientDiagnosisBasicInfo, {partial: true}),
        },
      },
    })
    patientDiagnosisBasicInfo: PatientDiagnosisBasicInfo,
  ): Promise<void> {
    await this.patientDiagnosisBasicInfoRepository.updateById(
      id,
      patientDiagnosisBasicInfo,
    );
  }

  @put('/patientDiagnosisBasicInfo/{id}', {
    responses: {
      '204': {
        description: 'PatientDiagnosisBasicInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientDiagnosisBasicInfo: PatientDiagnosisBasicInfo,
  ): Promise<void> {
    await this.patientDiagnosisBasicInfoRepository.replaceById(
      id,
      patientDiagnosisBasicInfo,
    );
  }

  @del('/patientDiagnosisBasicInfo/{id}', {
    responses: {
      '204': {
        description: 'PatientDiagnosisBasicInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientDiagnosisBasicInfoRepository.deleteById(id);
  }
}
