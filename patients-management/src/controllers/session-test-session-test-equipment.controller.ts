import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SessionTest,
  SessionTestEquipment,
} from '../models';
import {SessionTestRepository} from '../repositories';

export class SessionTestSessionTestEquipmentController {
  constructor(
    @repository(SessionTestRepository) protected sessionTestRepository: SessionTestRepository,
  ) { }

  @get('/session-tests/{id}/session-test-equipments', {
    responses: {
      '200': {
        description: 'Array of SessionTest has many SessionTestEquipment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionTestEquipment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionTestEquipment>,
  ): Promise<SessionTestEquipment[]> {
    return this.sessionTestRepository.sessionTestEquipments(id).find(filter);
  }

  @post('/session-tests/{id}/session-test-equipments', {
    responses: {
      '200': {
        description: 'SessionTest model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionTestEquipment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionTest.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTestEquipment, {
            title: 'NewSessionTestEquipmentInSessionTest',
            exclude: ['id'],
            optional: ['sessionTestId']
          }),
        },
      },
    }) sessionTestEquipment: Omit<SessionTestEquipment, 'id'>,
  ): Promise<SessionTestEquipment> {
    return this.sessionTestRepository.sessionTestEquipments(id).create(sessionTestEquipment);
  }

  @patch('/session-tests/{id}/session-test-equipments', {
    responses: {
      '200': {
        description: 'SessionTest.SessionTestEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionTestEquipment, {partial: true}),
        },
      },
    })
    sessionTestEquipment: Partial<SessionTestEquipment>,
    @param.query.object('where', getWhereSchemaFor(SessionTestEquipment)) where?: Where<SessionTestEquipment>,
  ): Promise<Count> {
    return this.sessionTestRepository.sessionTestEquipments(id).patch(sessionTestEquipment, where);
  }

  @del('/session-tests/{id}/session-test-equipments', {
    responses: {
      '200': {
        description: 'SessionTest.SessionTestEquipment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionTestEquipment)) where?: Where<SessionTestEquipment>,
  ): Promise<Count> {
    return this.sessionTestRepository.sessionTestEquipments(id).delete(where);
  }
}
