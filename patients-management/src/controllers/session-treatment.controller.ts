import {candidaciesCountByDepartment} from './../models/candidacies-count-by-department.model';
import {CandidaciesCountByDepartmentRepository} from './../repositories/candidacies-count-by-department.repository';
import {TreatmentsCountByDepartment} from './../models/treatments-count-by-department.model';
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
import {
  SessionTreatmentRepository,
  TreatmentsCountByDepartmentRepository,
} from '../repositories';

export class SessionTreatmentController {
  constructor(
    @repository(SessionTreatmentRepository)
    public sessionTreatmentRepository: SessionTreatmentRepository,
    @repository(SessionTreatmentEquipmentRepository)
    public sessionTreatmentEquipmentRepository: SessionTreatmentEquipmentRepository,
    @repository(TreatmentsCountByDepartmentRepository)
    public treatmentsCountByDepartment: TreatmentsCountByDepartmentRepository,
    @repository(CandidaciesCountByDepartmentRepository)
    public candidaciesCountByDepartmentRepository: CandidaciesCountByDepartmentRepository,
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

  @get('/frequentlyUsedTreatments/{id}', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TreatmentsCountByDepartment, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async getFrequentlyUsedTreatments(
    @param.path.number('id') id: number,
  ): Promise<TreatmentsCountByDepartment[]> {
    let where: any;
    if (id) {
      where = {departmentId: id};
    }
    return this.treatmentsCountByDepartment.find({
      where,
      order: ['count desc'],
    });
  }

  @get('/frequentlyUsedCandidacies/{id}', {
    responses: {
      '200': {
        description: 'PatientSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(candidaciesCountByDepartment, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async getFrequentlyUsedCandidacies(
    @param.path.number('id') id: number,
  ): Promise<candidaciesCountByDepartment[]> {
    return this.candidaciesCountByDepartmentRepository.find({
      where: {departmentId: id},
      order: ['count desc'],
    });
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
