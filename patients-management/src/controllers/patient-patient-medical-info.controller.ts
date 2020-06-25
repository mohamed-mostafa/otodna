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
  Patient,
  PatientMedicalInfo,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientPatientMedicalInfoController {
  constructor(
    @repository(PatientRepository) protected patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/patient-medical-info', {
    responses: {
      '200': {
        description: 'Patient has one PatientMedicalInfo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientMedicalInfo),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PatientMedicalInfo>,
  ): Promise<PatientMedicalInfo> {
    return this.patientRepository.patientBasicInfo(id).get(filter);
  }

  @post('/patients/{id}/patient-medical-info', {
    responses: {
      '200': {
        description: 'Patient model instance',
        content: {'application/json': {schema: getModelSchemaRef(PatientMedicalInfo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Patient.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientMedicalInfo, {
            title: 'NewPatientMedicalInfoInPatient',
            exclude: ['patientId'],
            optional: ['patientId']
          }),
        },
      },
    }) patientMedicalInfo: Omit<PatientMedicalInfo, 'patientId'>,
  ): Promise<PatientMedicalInfo> {
    return this.patientRepository.patientBasicInfo(id).create(patientMedicalInfo);
  }

  @patch('/patients/{id}/patient-medical-info', {
    responses: {
      '200': {
        description: 'Patient.PatientMedicalInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientMedicalInfo, {partial: true}),
        },
      },
    })
    patientMedicalInfo: Partial<PatientMedicalInfo>,
    @param.query.object('where', getWhereSchemaFor(PatientMedicalInfo)) where?: Where<PatientMedicalInfo>,
  ): Promise<Count> {
    return this.patientRepository.patientBasicInfo(id).patch(patientMedicalInfo, where);
  }

  @del('/patients/{id}/patient-medical-info', {
    responses: {
      '200': {
        description: 'Patient.PatientMedicalInfo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PatientMedicalInfo)) where?: Where<PatientMedicalInfo>,
  ): Promise<Count> {
    return this.patientRepository.patientBasicInfo(id).delete(where);
  }
}
