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
import {PatientFamilyMember} from '../models';
import {PatientFamilyMemberRepository} from '../repositories';

export class FamilyController {
  constructor(
    @repository(PatientFamilyMemberRepository)
    public patientFamilyMemberRepository : PatientFamilyMemberRepository,
  ) {}

  @post('/patientFamilyMembers', {
    responses: {
      '200': {
        description: 'PatientFamilyMember model instance',
        content: {'application/json': {schema: getModelSchemaRef(PatientFamilyMember)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientFamilyMember, {
            title: 'NewPatientFamilyMember',
            exclude: ['id'],
          }),
        },
      },
    })
    patientFamilyMember: Omit<PatientFamilyMember, 'id'>,
  ): Promise<PatientFamilyMember> {
    return this.patientFamilyMemberRepository.create(patientFamilyMember);
  }

  @get('/patientFamilyMembers/count', {
    responses: {
      '200': {
        description: 'PatientFamilyMember model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PatientFamilyMember) where?: Where<PatientFamilyMember>,
  ): Promise<Count> {
    return this.patientFamilyMemberRepository.count(where);
  }

  @get('/patientFamilyMembers', {
    responses: {
      '200': {
        description: 'Array of PatientFamilyMember model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PatientFamilyMember, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PatientFamilyMember) filter?: Filter<PatientFamilyMember>,
  ): Promise<PatientFamilyMember[]> {
    return this.patientFamilyMemberRepository.find(filter);
  }

  @patch('/patientFamilyMembers', {
    responses: {
      '200': {
        description: 'PatientFamilyMember PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientFamilyMember, {partial: true}),
        },
      },
    })
    patientFamilyMember: PatientFamilyMember,
    @param.where(PatientFamilyMember) where?: Where<PatientFamilyMember>,
  ): Promise<Count> {
    return this.patientFamilyMemberRepository.updateAll(patientFamilyMember, where);
  }

  @get('/patientFamilyMembers/{id}', {
    responses: {
      '200': {
        description: 'PatientFamilyMember model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PatientFamilyMember, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PatientFamilyMember, {exclude: 'where'}) filter?: FilterExcludingWhere<PatientFamilyMember>
  ): Promise<PatientFamilyMember> {
    return this.patientFamilyMemberRepository.findById(id, filter);
  }

  @patch('/patientFamilyMembers/{id}', {
    responses: {
      '204': {
        description: 'PatientFamilyMember PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PatientFamilyMember, {partial: true}),
        },
      },
    })
    patientFamilyMember: PatientFamilyMember,
  ): Promise<void> {
    await this.patientFamilyMemberRepository.updateById(id, patientFamilyMember);
  }

  @put('/patientFamilyMembers/{id}', {
    responses: {
      '204': {
        description: 'PatientFamilyMember PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() patientFamilyMember: PatientFamilyMember,
  ): Promise<void> {
    await this.patientFamilyMemberRepository.replaceById(id, patientFamilyMember);
  }

  @del('/patientFamilyMembers/{id}', {
    responses: {
      '204': {
        description: 'PatientFamilyMember DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientFamilyMemberRepository.deleteById(id);
  }
}
