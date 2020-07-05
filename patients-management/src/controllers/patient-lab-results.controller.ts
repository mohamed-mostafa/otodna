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
import {PatientLabResult} from '../models';
import {PatientLabResultRepository} from '../repositories';

export class PatientLabResultsController {
  constructor(
    @repository(PatientLabResultRepository)
    public patientLabResultRepository : PatientLabResultRepository,
  ) {}

  @post('/patientLabResults', {
    responses: {
      '200': {
        description: 'PatientLabResult model instance',
        content: {'application/json': {schema: getModelSchemaRef(PatientLabResult)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientLabResult, {
            title: 'NewPatientLabResult',
            exclude: ['id'],
          }),
        },
      },
    })
    patientLabResult: Omit<PatientLabResult, 'id'>,
  ): Promise<PatientLabResult> {
    return this.patientLabResultRepository.create(patientLabResult);
  }

  @get('/patientLabResults/count', {
    responses: {
      '200': {
        description: 'PatientLabResult model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientLabResult) where?: Where<PatientLabResult>,
  ): Promise<Count> {
    return this.patientLabResultRepository.count(where);
  }

  @get('/patientLabResults', {
    responses: {
      '200': {
        description: 'Array of PatientLabResult model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientLabResult, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientLabResult) filter?: Filter<PatientLabResult>,
  ): Promise<PatientLabResult[]> {
    return this.patientLabResultRepository.find(filter);
  }

  @patch('/patientLabResults', {
    responses: {
      '200': {
        description: 'PatientLabResult PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientLabResult, {partial: true}),
        },
      },
    })
    patientLabResult: PatientLabResult,
    @param.where(PatientLabResult) where?: Where<PatientLabResult>,
  ): Promise<Count> {
    return this.patientLabResultRepository.updateAll(patientLabResult, where);
  }

  @get('/patientLabResults/{id}', {
    responses: {
      '200': {
        description: 'PatientLabResult model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientLabResult, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientLabResult, {exclude: 'where'}) filter?: FilterExcludingWhere<PatientLabResult>
  ): Promise<PatientLabResult> {
    return this.patientLabResultRepository.findById(id, filter);
  }

  @patch('/patientLabResults/{id}', {
    responses: {
      '204': {
        description: 'PatientLabResult PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientLabResult, {partial: true}),
        },
      },
    })
    patientLabResult: PatientLabResult,
  ): Promise<void> {
    await this.patientLabResultRepository.updateById(id, patientLabResult);
  }

  @put('/patientLabResults/{id}', {
    responses: {
      '204': {
        description: 'PatientLabResult PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientLabResult: PatientLabResult,
  ): Promise<void> {
    await this.patientLabResultRepository.replaceById(id, patientLabResult);
  }

  @del('/patientLabResults/{id}', {
    responses: {
      '204': {
        description: 'PatientLabResult DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientLabResultRepository.deleteById(id);
  }
}
