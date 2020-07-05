import {ImmunizationStatus} from './../models/immunization-status.model';
import {ImmunizationStatusRepository} from './../repositories/immunization-status.repository';
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
import {PatientImmunization} from '../models';
import {PatientImmunizationRepository} from '../repositories';

export class PatientImmunizationController {
  constructor(
    @repository(PatientImmunizationRepository)
    public patientImmunizationRepository: PatientImmunizationRepository,
    @repository(ImmunizationStatusRepository)
    public immunizationStatusRepository: ImmunizationStatusRepository,
  ) {}

  @post('/patientImmunization', {
    responses: {
      '200': {
        description: 'PatientImmunization model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PatientImmunization)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientImmunization, {
            title: 'NewPatientImmunization',
            exclude: ['id'],
          }),
        },
      },
    })
    patientImmunization: Omit<PatientImmunization, 'id'>,
  ): Promise<PatientImmunization> {
    return this.patientImmunizationRepository.create(patientImmunization);
  }

  @get('/patientImmunization/count', {
    responses: {
      '200': {
        description: 'PatientImmunization model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientImmunization) where?: Where<PatientImmunization>,
  ): Promise<Count> {
    return this.patientImmunizationRepository.count(where);
  }

  @get('/patientImmunization', {
    responses: {
      '200': {
        description: 'Array of PatientImmunization model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientImmunization, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientImmunization) filter?: Filter<PatientImmunization>,
  ): Promise<PatientImmunization[]> {
    return this.patientImmunizationRepository.find(filter);
  }

  @get('/patientImmunization/statuses', {
    responses: {
      '200': {
        description: 'Array of PatientImmunization model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ImmunizationStatus, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async findImmunizationStatus(
    @param.filter(ImmunizationStatus) filter?: Filter<ImmunizationStatus>,
  ): Promise<ImmunizationStatus[]> {
    return this.immunizationStatusRepository.find(filter);
  }

  @patch('/patientImmunization', {
    responses: {
      '200': {
        description: 'PatientImmunization PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientImmunization, {partial: true}),
        },
      },
    })
    patientImmunization: PatientImmunization,
    @param.where(PatientImmunization) where?: Where<PatientImmunization>,
  ): Promise<Count> {
    return this.patientImmunizationRepository.updateAll(
      patientImmunization,
      where,
    );
  }

  @get('/patientImmunization/{id}', {
    responses: {
      '200': {
        description: 'PatientImmunization model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientImmunization, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientImmunization, {exclude: 'where'})
    filter?: FilterExcludingWhere<PatientImmunization>,
  ): Promise<PatientImmunization> {
    return this.patientImmunizationRepository.findById(id, filter);
  }

  @get('/patientImmunization/statuses/{id}', {
    responses: {
      '200': {
        description: 'PatientImmunization model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ImmunizationStatus, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findImmunizationStatusById(
    @param.path.number('id') id: number,
    @param.filter(ImmunizationStatus, {exclude: 'where'})
    filter?: FilterExcludingWhere<ImmunizationStatus>,
  ): Promise<ImmunizationStatus> {
    return this.immunizationStatusRepository.findById(id, filter);
  }

  @patch('/patientImmunization/{id}', {
    responses: {
      '204': {
        description: 'PatientImmunization PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientImmunization, {partial: true}),
        },
      },
    })
    patientImmunization: PatientImmunization,
  ): Promise<void> {
    await this.patientImmunizationRepository.updateById(
      id,
      patientImmunization,
    );
  }

  @put('/patientImmunization/{id}', {
    responses: {
      '204': {
        description: 'PatientImmunization PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientImmunization: PatientImmunization,
  ): Promise<void> {
    await this.patientImmunizationRepository.replaceById(
      id,
      patientImmunization,
    );
  }

  @del('/patientImmunization/{id}', {
    responses: {
      '204': {
        description: 'PatientImmunization DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientImmunizationRepository.deleteById(id);
  }
}
