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
import {SessionTestEquipment} from '../models';
import {SessionTestEquipmentRepository} from '../repositories';

export class SessionTestEquipmentController {
  constructor(
    @repository(SessionTestEquipmentRepository)
    public sessionTestEquipmentRepository : SessionTestEquipmentRepository,
  ) {}

  @post('/session-test-equipments', {
    responses: {
      '200': {
        description: 'SessionTestEquipment model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTestEquipment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTestEquipment, {
            title: 'NewSessionTestEquipment',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionTestEquipment: Omit<SessionTestEquipment, 'id'>,
  ): Promise<SessionTestEquipment> {
    return this.sessionTestEquipmentRepository.create(sessionTestEquipment);
  }

  @get('/session-test-equipments/count', {
    responses: {
      '200': {
        description: 'SessionTestEquipment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionTestEquipment) where?: Where<SessionTestEquipment>,
  ): Promise<Count> {
    return this.sessionTestEquipmentRepository.count(where);
  }

  @get('/session-test-equipments', {
    responses: {
      '200': {
        description: 'Array of SessionTestEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTestEquipment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionTestEquipment) filter?: Filter<SessionTestEquipment>,
  ): Promise<SessionTestEquipment[]> {
    return this.sessionTestEquipmentRepository.find(filter);
  }

  @patch('/session-test-equipments', {
    responses: {
      '200': {
        description: 'SessionTestEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTestEquipment, {partial: true}),
        },
      },
    })
    sessionTestEquipment: SessionTestEquipment,
    @param.where(SessionTestEquipment) where?: Where<SessionTestEquipment>,
  ): Promise<Count> {
    return this.sessionTestEquipmentRepository.updateAll(sessionTestEquipment, where);
  }

  @get('/session-test-equipments/{id}', {
    responses: {
      '200': {
        description: 'SessionTestEquipment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionTestEquipment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionTestEquipment, {exclude: 'where'}) filter?: FilterExcludingWhere<SessionTestEquipment>
  ): Promise<SessionTestEquipment> {
    return this.sessionTestEquipmentRepository.findById(id, filter);
  }

  @patch('/session-test-equipments/{id}', {
    responses: {
      '204': {
        description: 'SessionTestEquipment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTestEquipment, {partial: true}),
        },
      },
    })
    sessionTestEquipment: SessionTestEquipment,
  ): Promise<void> {
    await this.sessionTestEquipmentRepository.updateById(id, sessionTestEquipment);
  }

  @put('/session-test-equipments/{id}', {
    responses: {
      '204': {
        description: 'SessionTestEquipment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionTestEquipment: SessionTestEquipment,
  ): Promise<void> {
    await this.sessionTestEquipmentRepository.replaceById(id, sessionTestEquipment);
  }

  @del('/session-test-equipments/{id}', {
    responses: {
      '204': {
        description: 'SessionTestEquipment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionTestEquipmentRepository.deleteById(id);
  }
}
