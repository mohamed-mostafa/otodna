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
import {ClinicalHistory} from '../models';
import {ClinicalHistoryRepository} from '../repositories';

export class ClinicalHistoryController {
  constructor(
    @repository(ClinicalHistoryRepository)
    public clinicalHistoryRepository : ClinicalHistoryRepository,
  ) {}

  @post('/clinical-histories', {
    responses: {
      '200': {
        description: 'ClinicalHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClinicalHistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClinicalHistory, {
            title: 'NewClinicalHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    clinicalHistory: Omit<ClinicalHistory, 'id'>,
  ): Promise<ClinicalHistory> {
    return this.clinicalHistoryRepository.create(clinicalHistory);
  }

  @get('/clinical-histories/count', {
    responses: {
      '200': {
        description: 'ClinicalHistory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ClinicalHistory) where?: Where<ClinicalHistory>,
  ): Promise<Count> {
    return this.clinicalHistoryRepository.count(where);
  }

  @get('/clinical-histories', {
    responses: {
      '200': {
        description: 'Array of ClinicalHistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ClinicalHistory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ClinicalHistory) filter?: Filter<ClinicalHistory>,
  ): Promise<ClinicalHistory[]> {
    return this.clinicalHistoryRepository.find(filter);
  }

  @patch('/clinical-histories', {
    responses: {
      '200': {
        description: 'ClinicalHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClinicalHistory, {partial: true}),
        },
      },
    })
    clinicalHistory: ClinicalHistory,
    @param.where(ClinicalHistory) where?: Where<ClinicalHistory>,
  ): Promise<Count> {
    return this.clinicalHistoryRepository.updateAll(clinicalHistory, where);
  }

  @get('/clinical-histories/{id}', {
    responses: {
      '200': {
        description: 'ClinicalHistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClinicalHistory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ClinicalHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<ClinicalHistory>
  ): Promise<ClinicalHistory> {
    return this.clinicalHistoryRepository.findById(id, filter);
  }

  @patch('/clinical-histories/{id}', {
    responses: {
      '204': {
        description: 'ClinicalHistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClinicalHistory, {partial: true}),
        },
      },
    })
    clinicalHistory: ClinicalHistory,
  ): Promise<void> {
    await this.clinicalHistoryRepository.updateById(id, clinicalHistory);
  }

  @put('/clinical-histories/{id}', {
    responses: {
      '204': {
        description: 'ClinicalHistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clinicalHistory: ClinicalHistory,
  ): Promise<void> {
    await this.clinicalHistoryRepository.replaceById(id, clinicalHistory);
  }

  @del('/clinical-histories/{id}', {
    responses: {
      '204': {
        description: 'ClinicalHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clinicalHistoryRepository.deleteById(id);
  }
}
