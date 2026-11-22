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
import {Symptom} from '../models';
import {SymptomRepository} from '../repositories';

export class SymptomController {
  constructor(
    @repository(SymptomRepository)
    public symptomRepository : SymptomRepository,
  ) {}

  @post('/symptoms', {
    responses: {
      '200': {
        description: 'Symptom model instance',
        content: {'application/json': {schema: getModelSchemaRef(Symptom)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Symptom, {
            title: 'NewSymptom',
            exclude: ['id'],
          }),
        },
      },
    })
    symptom: Omit<Symptom, 'id'>,
  ): Promise<Symptom> {
    return this.symptomRepository.create(symptom);
  }

  @get('/symptoms/count', {
    responses: {
      '200': {
        description: 'Symptom model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Symptom) where?: Where<Symptom>,
  ): Promise<Count> {
    return this.symptomRepository.count(where);
  }

  @get('/symptoms', {
    responses: {
      '200': {
        description: 'Array of Symptom model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Symptom, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Symptom) filter?: Filter<Symptom>,
  ): Promise<Symptom[]> {
    return this.symptomRepository.find(filter);
  }

  @get('/symptoms/active', {
    responses: {
      '200': {
        description: 'Array of Active Symptom model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Symptom, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findActive(
  ): Promise<Symptom[]> {
    return this.symptomRepository.find({where: {"active": true}});
  }

  @patch('/symptoms', {
    responses: {
      '200': {
        description: 'Symptom PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Symptom, {partial: true}),
        },
      },
    })
    symptom: Symptom,
    @param.where(Symptom) where?: Where<Symptom>,
  ): Promise<Count> {
    return this.symptomRepository.updateAll(symptom, where);
  }

  @get('/symptoms/{id}', {
    responses: {
      '200': {
        description: 'Symptom model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Symptom, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Symptom, {exclude: 'where'}) filter?: FilterExcludingWhere<Symptom>
  ): Promise<Symptom> {
    return this.symptomRepository.findById(id, filter);
  }

  @patch('/symptoms/{id}', {
    responses: {
      '204': {
        description: 'Symptom PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Symptom, {partial: true}),
        },
      },
    })
    symptom: Symptom,
  ): Promise<void> {
    await this.symptomRepository.updateById(id, symptom);
  }

  @put('/symptoms/{id}', {
    responses: {
      '204': {
        description: 'Symptom PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() symptom: Symptom,
  ): Promise<void> {
    await this.symptomRepository.replaceById(id, symptom);
  }

  @del('/symptoms/{id}', {
    responses: {
      '204': {
        description: 'Symptom DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.symptomRepository.deleteById(id);
  }
}
