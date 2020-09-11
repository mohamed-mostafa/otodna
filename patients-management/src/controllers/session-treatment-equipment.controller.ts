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
import {SessionTreatmentEquipment} from '../models';
import {SessionTreatmentEquipmentRepository} from '../repositories';

export class SessionTreatmentEquipmentController {
  constructor(
    @repository(SessionTreatmentEquipmentRepository)
    public sessionTreatmentEquipmentRepository : SessionTreatmentEquipmentRepository,
  ) {}

  @post('/sessionTreatmentEquipment', {
    responses: {
      '200': {
        description: 'SessionTreatmentEquipment model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTreatmentEquipment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatmentEquipment, {
            title: 'NewSessionTreatmentEquipment',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionTreatmentEquipment: Omit<SessionTreatmentEquipment, 'id'>,
  ): Promise<SessionTreatmentEquipment> {
    return this.sessionTreatmentEquipmentRepository.create(sessionTreatmentEquipment);
  }

  @get('/sessionTreatmentEquipment/count', {
    responses: {
      '200': {
        description: 'SessionTreatmentEquipment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionTreatmentEquipment) where?: Where<SessionTreatmentEquipment>,
  ): Promise<Count> {
    return this.sessionTreatmentEquipmentRepository.count(where);
  }

  @get('/sessionTreatmentEquipment', {
    responses: {
      '200': {
        description: 'Array of SessionTreatmentEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTreatmentEquipment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionTreatmentEquipment) filter?: Filter<SessionTreatmentEquipment>,
  ): Promise<SessionTreatmentEquipment[]> {
    return this.sessionTreatmentEquipmentRepository.find(filter);
  }

  @patch('/sessionTreatmentEquipment', {
    responses: {
      '200': {
        description: 'SessionTreatmentEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatmentEquipment, {partial: true}),
        },
      },
    })
    sessionTreatmentEquipment: SessionTreatmentEquipment,
    @param.where(SessionTreatmentEquipment) where?: Where<SessionTreatmentEquipment>,
  ): Promise<Count> {
    return this.sessionTreatmentEquipmentRepository.updateAll(sessionTreatmentEquipment, where);
  }

  @get('/sessionTreatmentEquipment/{id}', {
    responses: {
      '200': {
        description: 'SessionTreatmentEquipment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionTreatmentEquipment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionTreatmentEquipment, {exclude: 'where'}) filter?: FilterExcludingWhere<SessionTreatmentEquipment>
  ): Promise<SessionTreatmentEquipment> {
    return this.sessionTreatmentEquipmentRepository.findById(id, filter);
  }

  @patch('/sessionTreatmentEquipment/{id}', {
    responses: {
      '204': {
        description: 'SessionTreatmentEquipment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatmentEquipment, {partial: true}),
        },
      },
    })
    sessionTreatmentEquipment: SessionTreatmentEquipment,
  ): Promise<void> {
    await this.sessionTreatmentEquipmentRepository.updateById(id, sessionTreatmentEquipment);
  }

  @put('/sessionTreatmentEquipment/{id}', {
    responses: {
      '204': {
        description: 'SessionTreatmentEquipment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionTreatmentEquipment: SessionTreatmentEquipment,
  ): Promise<void> {
    await this.sessionTreatmentEquipmentRepository.replaceById(id, sessionTreatmentEquipment);
  }

  @del('/sessionTreatmentEquipment/{id}', {
    responses: {
      '204': {
        description: 'SessionTreatmentEquipment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionTreatmentEquipmentRepository.deleteById(id);
  }
}
