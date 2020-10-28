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
import {PatientReferral} from '../models';
import {PatientReferralRepository} from '../repositories/patient-referral.repository';

export class PatientReferralController {
  constructor(
    @repository(PatientReferralRepository)
    public patientReferralRepository: PatientReferralRepository,
  ) {}

  @post('/patient-referrals', {
    responses: {
      '200': {
        description: 'PatientReferral model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientReferral)},
        },
      },
    },
  })
  async create(@requestBody() data: any): Promise<PatientReferral> {
    return this.patientReferralRepository.createPatientReferral(data);
  }

  @get('/patient-referrals/count', {
    responses: {
      '200': {
        description: 'PatientReferral model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientReferral) where?: Where<PatientReferral>,
  ): Promise<Count> {
    return this.patientReferralRepository.count(where);
  }

  @get('/patient-referrals', {
    responses: {
      '200': {
        description: 'Array of PatientReferral model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientReferral, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientReferral) filter?: Filter<PatientReferral>,
  ): Promise<PatientReferral[]> {
    return this.patientReferralRepository.find(filter);
  }

  @patch('/patient-referrals', {
    responses: {
      '200': {
        description: 'PatientReferral PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientReferral, {partial: true}),
        },
      },
    })
    patientReferral: PatientReferral,
    @param.where(PatientReferral) where?: Where<PatientReferral>,
  ): Promise<Count> {
    return this.patientReferralRepository.updateAll(patientReferral, where);
  }

  @get('/patient-referrals/{id}', {
    responses: {
      '200': {
        description: 'PatientReferral model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientReferral, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientReferral, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientReferral>,
  ): Promise<PatientReferral> {
    return this.patientReferralRepository.findById(id, filter);
  }

  @patch('/patient-referrals/{id}', {
    responses: {
      '204': {
        description: 'PatientReferral PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientReferral, {partial: true}),
        },
      },
    })
    patientReferral: PatientReferral,
  ): Promise<void> {
    await this.patientReferralRepository.updateById(id, patientReferral);
  }

  @put('/patient-referrals/{id}', {
    responses: {
      '204': {
        description: 'PatientReferral PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientReferral: PatientReferral,
  ): Promise<void> {
    await this.patientReferralRepository.replaceById(id, patientReferral);
  }

  @del('/patient-referrals/{id}', {
    responses: {
      '204': {
        description: 'PatientReferral DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientReferralRepository.deleteById(id);
  }
}
