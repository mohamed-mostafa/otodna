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
import {EquipmentParameterValue} from '../models/equipment_parameter-value.model';
import {EquipmentParameterValueRepository} from '../repositories/equipment_parameter-value.repository';

export class EquipmentParameterValueController {
  constructor(
    @repository(EquipmentParameterValueRepository)
    public equipmentParameterValueRepository: EquipmentParameterValueRepository,
  ) {}

  @post('/equipmentParameterValue', {
    responses: {
      '200': {
        description: 'EquipmentParameterValue model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EquipmentParameterValue),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipmentParameterValue, {
            title: 'NewEquipmentParameterValue',
            exclude: ['id'],
          }),
        },
      },
    })
    equipmentParameterValue: Omit<EquipmentParameterValue, 'id'>,
  ): Promise<EquipmentParameterValue> {
    return this.equipmentParameterValueRepository.create(
      equipmentParameterValue,
    );
  }
  @post('/equipmentParametersValues', {
    responses: {
      '200': {
        description: 'equipmentParametersValues model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EquipmentParameterValue),
          },
        },
      },
    },
  })
  async createParametersValues(
    @requestBody() data: Array<Object>,
  ): Promise<any> {
    return this.equipmentParameterValueRepository.createParametersValues(data);
  }
  @put('/equipmentParametersValues', {
    responses: {
      '200': {
        description: 'equipmentParametersValues model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EquipmentParameterValue),
          },
        },
      },
    },
  })
  async updateParametersValues(
    @requestBody() data: Array<Object>,
  ): Promise<any> {
    return this.equipmentParameterValueRepository.updateParametersValues(data);
  }
  @get('/equipmentParameterValue/count', {
    responses: {
      '200': {
        description: 'EquipmentParameterValue model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EquipmentParameterValue)
    where?: Where<EquipmentParameterValue>,
  ): Promise<Count> {
    return this.equipmentParameterValueRepository.count(where);
  }

  @get('/equipmentParameterValue', {
    responses: {
      '200': {
        description: 'Array of EquipmentParameterValue model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EquipmentParameterValue, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EquipmentParameterValue)
    filter?: Filter<EquipmentParameterValue>,
  ): Promise<EquipmentParameterValue[]> {
    return this.equipmentParameterValueRepository.find(filter);
  }

  @patch('/equipmentParameterValue', {
    responses: {
      '200': {
        description: 'EquipmentParameterValue PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipmentParameterValue, {partial: true}),
        },
      },
    })
    equipmentParameterValue: EquipmentParameterValue,
    @param.where(EquipmentParameterValue)
    where?: Where<EquipmentParameterValue>,
  ): Promise<Count> {
    return this.equipmentParameterValueRepository.updateAll(
      equipmentParameterValue,
      where,
    );
  }

  @get('/equipmentParameterValue/{id}', {
    responses: {
      '200': {
        description: 'EquipmentParameterValue model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EquipmentParameterValue, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EquipmentParameterValue, {exclude: 'where'})
    filter?: FilterExcludingWhere<EquipmentParameterValue>,
  ): Promise<EquipmentParameterValue> {
    return this.equipmentParameterValueRepository.findById(id, filter);
  }

  @patch('/equipmentParameterValue/{id}', {
    responses: {
      '204': {
        description: 'EquipmentParameterValue PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipmentParameterValue, {partial: true}),
        },
      },
    })
    equipmentParameterValue: EquipmentParameterValue,
  ): Promise<void> {
    await this.equipmentParameterValueRepository.updateById(
      id,
      equipmentParameterValue,
    );
  }

  @put('/equipmentParameterValue/{id}', {
    responses: {
      '204': {
        description: 'EquipmentParameterValue PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() equipmentParameterValue: EquipmentParameterValue,
  ): Promise<void> {
    await this.equipmentParameterValueRepository.replaceById(
      id,
      equipmentParameterValue,
    );
  }

  @del('/equipmentParameterValue/{id}', {
    responses: {
      '204': {
        description: 'EquipmentParameterValue DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.equipmentParameterValueRepository.deleteById(id);
  }
}
