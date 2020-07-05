import {ProblemStatus} from './../models/problem-status.model';
import {ProblemStatusRepository} from './../repositories/problem-status.repository';
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
import {PatientProblem} from '../models';
import {PatientProblemRepository} from '../repositories';

export class PatientProblemController {
  constructor(
    @repository(PatientProblemRepository)
    public patientProblemRepository: PatientProblemRepository,
    @repository(ProblemStatusRepository)
    public problemStatusRepository: ProblemStatusRepository,
  ) {}

  @post('/patientProblem', {
    responses: {
      '200': {
        description: 'PatientProblem model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientProblem)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientProblem, {
            title: 'NewPatientProblem',
            exclude: ['id'],
          }),
        },
      },
    })
    patientProblem: Omit<PatientProblem, 'id'>,
  ): Promise<PatientProblem> {
    return this.patientProblemRepository.create(patientProblem);
  }

  @get('/patientProblem/count', {
    responses: {
      '200': {
        description: 'PatientProblem model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientProblem) where?: Where<PatientProblem>,
  ): Promise<Count> {
    return this.patientProblemRepository.count(where);
  }

  @get('/patientProblem', {
    responses: {
      '200': {
        description: 'Array of PatientProblem model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientProblem, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientProblem) filter?: Filter<PatientProblem>,
  ): Promise<PatientProblem[]> {
    return this.patientProblemRepository.find(filter);
  }

  @get('/patientProblem/statuses', {
    responses: {
      '200': {
        description: 'Array of PatientProblem model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProblemStatus, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findProblemStatus(
    @param.filter(ProblemStatus) filter?: Filter<ProblemStatus>,
  ): Promise<ProblemStatus[]> {
    return this.problemStatusRepository.find(filter);
  }

  @patch('/patientProblem', {
    responses: {
      '200': {
        description: 'PatientProblem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientProblem, {partial: true}),
        },
      },
    })
    patientProblem: PatientProblem,
    @param.where(PatientProblem) where?: Where<PatientProblem>,
  ): Promise<Count> {
    return this.patientProblemRepository.updateAll(patientProblem, where);
  }

  @get('/patientProblem/{id}', {
    responses: {
      '200': {
        description: 'PatientProblem model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientProblem, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientProblem, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientProblem>,
  ): Promise<PatientProblem> {
    return this.patientProblemRepository.findById(id, filter);
  }

  @get('/patientProblem/statuses/{id}', {
    responses: {
      '200': {
        description: 'PatientProblem model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProblemStatus, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findProblemStatusById(
    @param.path.number('id') id: number,
    @param.filter(ProblemStatus, {exclude: 'where'})
    filter?: FilterExcludingWhere<ProblemStatus>,
  ): Promise<ProblemStatus> {
    return this.problemStatusRepository.findById(id, filter);
  }

  @patch('/patientProblem/{id}', {
    responses: {
      '204': {
        description: 'PatientProblem PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientProblem, {partial: true}),
        },
      },
    })
    patientProblem: PatientProblem,
  ): Promise<void> {
    await this.patientProblemRepository.updateById(id, patientProblem);
  }

  @put('/patientProblem/{id}', {
    responses: {
      '204': {
        description: 'PatientProblem PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientProblem: PatientProblem,
  ): Promise<void> {
    await this.patientProblemRepository.replaceById(id, patientProblem);
  }

  @del('/patientProblem/{id}', {
    responses: {
      '204': {
        description: 'PatientProblem DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientProblemRepository.deleteById(id);
  }
}
