import {SessionTreatmentEquipment} from './../models/session-treatment-equipment.model';
import {SessionTreatmentEquipmentRepository} from './../repositories/session-treatment-equipment.repository';
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
import {SessionTreatment} from '../models';
import {SessionTreatmentRepository} from '../repositories';

export class SessionTreatmentController {
  constructor(
    @repository(SessionTreatmentRepository)
    public sessionTreatmentRepository: SessionTreatmentRepository,
    @repository(SessionTreatmentEquipmentRepository)
    public sessionTreatmentEquipmentRepository: SessionTreatmentEquipmentRepository,
  ) {}

  @post('/session-treatments', {
    responses: {
      '200': {
        description: 'SessionTreatment model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(SessionTreatment)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatment, {
            title: 'NewSessionTreatment',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionTreatment: Omit<SessionTreatment, 'id'>,
  ): Promise<SessionTreatment> {
    return this.sessionTreatmentRepository.create(sessionTreatment);
  }

  @get('/session-treatments/count', {
    responses: {
      '200': {
        description: 'SessionTreatment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionTreatment) where?: Where<SessionTreatment>,
  ): Promise<Count> {
    return this.sessionTreatmentRepository.count(where);
  }

  @get('/session-treatments', {
    responses: {
      '200': {
        description: 'Array of SessionTreatment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTreatment, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionTreatment) filter?: Filter<SessionTreatment>,
  ): Promise<SessionTreatment[]> {
    return this.sessionTreatmentRepository.find(filter);
  }

  @get('/sessionTreatmentEquipment', {
    responses: {
      '200': {
        description: 'Array of sessionTreatmentEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionTreatmentEquipment, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findSessionTreatmentEquipment(
    @param.filter(SessionTreatmentEquipment)
    filter?: Filter<SessionTreatmentEquipment>,
  ): Promise<SessionTreatmentEquipment[]> {
    return this.sessionTreatmentEquipmentRepository.find(filter);
  }

  @patch('/session-treatments', {
    responses: {
      '200': {
        description: 'SessionTreatment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatment, {partial: true}),
        },
      },
    })
    sessionTreatment: SessionTreatment,
    @param.where(SessionTreatment) where?: Where<SessionTreatment>,
  ): Promise<Count> {
    return this.sessionTreatmentRepository.updateAll(sessionTreatment, where);
  }

  @get('/session-treatments/{id}', {
    responses: {
      '200': {
        description: 'SessionTreatment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionTreatment, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionTreatment, {exclude: 'where'})
    filter?: FilterExcludingWhere<SessionTreatment>,
  ): Promise<SessionTreatment> {
    return this.sessionTreatmentRepository.findById(id, filter);
  }

  @patch('/session-treatments/{id}', {
    responses: {
      '204': {
        description: 'SessionTreatment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTreatment, {partial: true}),
        },
      },
    })
    sessionTreatment: SessionTreatment,
  ): Promise<void> {
    await this.sessionTreatmentRepository.updateById(id, sessionTreatment);
  }

  @put('/session-treatments/{id}', {
    responses: {
      '204': {
        description: 'SessionTreatment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionTreatment: SessionTreatment,
  ): Promise<void> {
    await this.sessionTreatmentRepository.replaceById(id, sessionTreatment);
  }

  @del('/session-treatments/{id}', {
    responses: {
      '204': {
        description: 'SessionTreatment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionTreatmentRepository.deleteById(id);
  }
}
