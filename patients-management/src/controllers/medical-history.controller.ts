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
import {MedicalHistory} from '../models';
import {MedicalHistoryRepository} from '../repositories';

export class MedicalHistoryController {
  constructor(
    @repository(MedicalHistoryRepository)
    public medicalHistoryRepository : MedicalHistoryRepository,
  ) {}

  @post('/medical-histories', {
    responses: {
      '200': {
        description: 'MedicalHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedicalHistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicalHistory, {
            title: 'NewMedicalHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    medicalHistory: Omit<MedicalHistory, 'id'>,
  ): Promise<MedicalHistory> {
    return this.medicalHistoryRepository.create(medicalHistory);
  }

  @get('/medical-histories/count', {
    responses: {
      '200': {
        description: 'MedicalHistory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MedicalHistory) where?: Where<MedicalHistory>,
  ): Promise<Count> {
    return this.medicalHistoryRepository.count(where);
  }

  @get('/medical-histories', {
    responses: {
      '200': {
        description: 'Array of MedicalHistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MedicalHistory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MedicalHistory) filter?: Filter<MedicalHistory>,
  ): Promise<MedicalHistory[]> {
    return this.medicalHistoryRepository.find(filter);
  }

  @patch('/medical-histories', {
    responses: {
      '200': {
        description: 'MedicalHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicalHistory, {partial: true}),
        },
      },
    })
    medicalHistory: MedicalHistory,
    @param.where(MedicalHistory) where?: Where<MedicalHistory>,
  ): Promise<Count> {
    return this.medicalHistoryRepository.updateAll(medicalHistory, where);
  }

  @get('/medical-histories/{id}', {
    responses: {
      '200': {
        description: 'MedicalHistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MedicalHistory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MedicalHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<MedicalHistory>
  ): Promise<MedicalHistory> {
    return this.medicalHistoryRepository.findById(id, filter);
  }

  @patch('/medical-histories/{id}', {
    responses: {
      '204': {
        description: 'MedicalHistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicalHistory, {partial: true}),
        },
      },
    })
    medicalHistory: MedicalHistory,
  ): Promise<void> {
    await this.medicalHistoryRepository.updateById(id, medicalHistory);
  }

  @put('/medical-histories/{id}', {
    responses: {
      '204': {
        description: 'MedicalHistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medicalHistory: MedicalHistory,
  ): Promise<void> {
    await this.medicalHistoryRepository.replaceById(id, medicalHistory);
  }

  @del('/medical-histories/{id}', {
    responses: {
      '204': {
        description: 'MedicalHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medicalHistoryRepository.deleteById(id);
  }
}
