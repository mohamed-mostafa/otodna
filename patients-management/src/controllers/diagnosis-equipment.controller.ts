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
import {DiagnosisEquipment} from '../models';
import {DiagnosisEquipmentRepository} from '../repositories';

export class DiagnosisEquipmentController {
  constructor(
    @repository(DiagnosisEquipmentRepository)
    public diagnosisEquipmentRepository : DiagnosisEquipmentRepository,
  ) {}

  @post('/diagnosis-equipments', {
    responses: {
      '200': {
        description: 'DiagnosisEquipment model instance',
        content: {'application/json': {schema: getModelSchemaRef(DiagnosisEquipment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiagnosisEquipment, {
            title: 'NewDiagnosisEquipment',
            exclude: ['id'],
          }),
        },
      },
    })
    diagnosisEquipment: Omit<DiagnosisEquipment, 'id'>,
  ): Promise<DiagnosisEquipment> {
    return this.diagnosisEquipmentRepository.create(diagnosisEquipment);
  }

  @get('/diagnosis-equipments/count', {
    responses: {
      '200': {
        description: 'DiagnosisEquipment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DiagnosisEquipment) where?: Where<DiagnosisEquipment>,
  ): Promise<Count> {
    return this.diagnosisEquipmentRepository.count(where);
  }

  @get('/diagnosis-equipments', {
    responses: {
      '200': {
        description: 'Array of DiagnosisEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DiagnosisEquipment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DiagnosisEquipment) filter?: Filter<DiagnosisEquipment>,
  ): Promise<DiagnosisEquipment[]> {
    return this.diagnosisEquipmentRepository.find(filter);
  }

  @patch('/diagnosis-equipments', {
    responses: {
      '200': {
        description: 'DiagnosisEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiagnosisEquipment, {partial: true}),
        },
      },
    })
    diagnosisEquipment: DiagnosisEquipment,
    @param.where(DiagnosisEquipment) where?: Where<DiagnosisEquipment>,
  ): Promise<Count> {
    return this.diagnosisEquipmentRepository.updateAll(diagnosisEquipment, where);
  }

  @get('/diagnosis-equipments/{id}', {
    responses: {
      '200': {
        description: 'DiagnosisEquipment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DiagnosisEquipment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DiagnosisEquipment, {exclude: 'where'}) filter?: FilterExcludingWhere<DiagnosisEquipment>
  ): Promise<DiagnosisEquipment> {
    return this.diagnosisEquipmentRepository.findById(id, filter);
  }

  @patch('/diagnosis-equipments/{id}', {
    responses: {
      '204': {
        description: 'DiagnosisEquipment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiagnosisEquipment, {partial: true}),
        },
      },
    })
    diagnosisEquipment: DiagnosisEquipment,
  ): Promise<void> {
    await this.diagnosisEquipmentRepository.updateById(id, diagnosisEquipment);
  }

  @put('/diagnosis-equipments/{id}', {
    responses: {
      '204': {
        description: 'DiagnosisEquipment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() diagnosisEquipment: DiagnosisEquipment,
  ): Promise<void> {
    await this.diagnosisEquipmentRepository.replaceById(id, diagnosisEquipment);
  }

  @del('/diagnosis-equipments/{id}', {
    responses: {
      '204': {
        description: 'DiagnosisEquipment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.diagnosisEquipmentRepository.deleteById(id);
  }
}
