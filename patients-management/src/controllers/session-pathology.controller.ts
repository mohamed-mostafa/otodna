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
import {PatientSessionPathology} from '../models';
import {PatientSessionPathologyRepository} from '../repositories';

export class SessionPathologyController {
  constructor(
    @repository(PatientSessionPathologyRepository)
    public patientSessionPathologyRepository : PatientSessionPathologyRepository,
  ) {}

  @post('/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'PatientSessionPathology model instance',
        content: {'application/json': {schema: getModelSchemaRef(PatientSessionPathology)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSessionPathology, {
            title: 'NewPatientSessionPathology',
            exclude: ['id'],
          }),
        },
      },
    })
    patientSessionPathology: Omit<PatientSessionPathology, 'id'>,
  ): Promise<PatientSessionPathology> {
    return this.patientSessionPathologyRepository.create(patientSessionPathology);
  }

  @get('/patient-session-pathologies/count', {
    responses: {
      '200': {
        description: 'PatientSessionPathology model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientSessionPathology) where?: Where<PatientSessionPathology>,
  ): Promise<Count> {
    return this.patientSessionPathologyRepository.count(where);
  }

  @get('/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'Array of PatientSessionPathology model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientSessionPathology, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientSessionPathology) filter?: Filter<PatientSessionPathology>,
  ): Promise<PatientSessionPathology[]> {
    return this.patientSessionPathologyRepository.find(filter);
  }

  @patch('/patient-session-pathologies', {
    responses: {
      '200': {
        description: 'PatientSessionPathology PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSessionPathology, {partial: true}),
        },
      },
    })
    patientSessionPathology: PatientSessionPathology,
    @param.where(PatientSessionPathology) where?: Where<PatientSessionPathology>,
  ): Promise<Count> {
    return this.patientSessionPathologyRepository.updateAll(patientSessionPathology, where);
  }

  @get('/patient-session-pathologies/{id}', {
    responses: {
      '200': {
        description: 'PatientSessionPathology model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientSessionPathology, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientSessionPathology, {exclude: 'where'}) filter?: FilterExcludingWhere<PatientSessionPathology>
  ): Promise<PatientSessionPathology> {
    return this.patientSessionPathologyRepository.findById(id, filter);
  }

  @patch('/patient-session-pathologies/{id}', {
    responses: {
      '204': {
        description: 'PatientSessionPathology PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientSessionPathology, {partial: true}),
        },
      },
    })
    patientSessionPathology: PatientSessionPathology,
  ): Promise<void> {
    await this.patientSessionPathologyRepository.updateById(id, patientSessionPathology);
  }

  @put('/patient-session-pathologies/{id}', {
    responses: {
      '204': {
        description: 'PatientSessionPathology PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientSessionPathology: PatientSessionPathology,
  ): Promise<void> {
    await this.patientSessionPathologyRepository.replaceById(id, patientSessionPathology);
  }

  @del('/patient-session-pathologies/{id}', {
    responses: {
      '204': {
        description: 'PatientSessionPathology DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientSessionPathologyRepository.deleteById(id);
  }
}
