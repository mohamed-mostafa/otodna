import {AllergyStatus} from './../models/allergy-status.model';
import {AllergySeverity} from './../models/allergy-severity.model';
import {AllergyType} from './../models/allergy-type.model';
import {AllergyStatusRepository} from '../repositories/allergy-status.repository';
import {AllergySeverityRepository} from '../repositories/allergy-severity.repository';
import {AllergyTypeRepository} from '../repositories/allergy-type.repository';
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
import {PatientAllergy} from '../models';
import {PatientAllergyRepository} from '../repositories';

export class AllergiesController {
  constructor(
    @repository(PatientAllergyRepository)
    public patientAllergyRepository: PatientAllergyRepository,
    @repository(AllergyTypeRepository)
    public allergyTypeRepository: AllergyTypeRepository,
    @repository(AllergySeverityRepository)
    public allergySeverityRepository: AllergySeverityRepository,
    @repository(AllergyStatusRepository)
    public allergyStatusRepository: AllergyStatusRepository,
  ) {}

  @post('/patientAllergies', {
    responses: {
      '200': {
        description: 'PatientAllergy model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientAllergy)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientAllergy, {
            title: 'NewPatientAllergy',
            exclude: ['id'],
          }),
        },
      },
    })
    patientAllergy: Omit<PatientAllergy, 'id'>,
  ): Promise<PatientAllergy> {
    return this.patientAllergyRepository.create(patientAllergy);
  }

  @get('/patientAllergies/count', {
    responses: {
      '200': {
        description: 'PatientAllergy model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientAllergy) where?: Where<PatientAllergy>,
  ): Promise<Count> {
    return this.patientAllergyRepository.count(where);
  }

  @get('/patientAllergies', {
    responses: {
      '200': {
        description: 'Array of PatientAllergy model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientAllergy, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientAllergy) filter?: Filter<PatientAllergy>,
  ): Promise<PatientAllergy[]> {
    return this.patientAllergyRepository.find(filter);
  }
  @get('/patientAllergies/types', {
    responses: {
      '200': {
        description: 'Array of PatientAllergy model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AllergyType, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findAllergyTypes(
    @param.filter(AllergyType) filter?: Filter<AllergyType>,
  ): Promise<AllergyType[]> {
    return this.allergyTypeRepository.find(filter);
  }
  @get('/patientAllergies/severities', {
    responses: {
      '200': {
        description: 'Array of PatientAllergy model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AllergySeverity, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findAllergySeverities(
    @param.filter(AllergySeverity) filter?: Filter<AllergySeverity>,
  ): Promise<AllergySeverity[]> {
    return this.allergySeverityRepository.find(filter);
  }
  @get('/patientAllergies/statuses', {
    responses: {
      '200': {
        description: 'Array of PatientAllergy model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AllergyStatus, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findAllergyStatuses(
    @param.filter(AllergyStatus) filter?: Filter<AllergyStatus>,
  ): Promise<AllergyStatus[]> {
    return this.allergyStatusRepository.find(filter);
  }

  @patch('/patientAllergies', {
    responses: {
      '200': {
        description: 'PatientAllergy PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientAllergy, {partial: true}),
        },
      },
    })
    patientAllergy: PatientAllergy,
    @param.where(PatientAllergy) where?: Where<PatientAllergy>,
  ): Promise<Count> {
    return this.patientAllergyRepository.updateAll(patientAllergy, where);
  }

  @get('/patientAllergies/{id}', {
    responses: {
      '200': {
        description: 'PatientAllergy model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientAllergy, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientAllergy, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientAllergy>,
  ): Promise<PatientAllergy> {
    return this.patientAllergyRepository.findById(id, filter);
  }

  @patch('/patientAllergies/{id}', {
    responses: {
      '204': {
        description: 'PatientAllergy PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientAllergy, {partial: true}),
        },
      },
    })
    patientAllergy: PatientAllergy,
  ): Promise<void> {
    await this.patientAllergyRepository.updateById(id, patientAllergy);
  }

  @put('/patientAllergies/{id}', {
    responses: {
      '204': {
        description: 'PatientAllergy PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientAllergy: PatientAllergy,
  ): Promise<void> {
    await this.patientAllergyRepository.replaceById(id, patientAllergy);
  }

  @del('/patientAllergies/{id}', {
    responses: {
      '204': {
        description: 'PatientAllergy DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientAllergyRepository.deleteById(id);
  }
}
