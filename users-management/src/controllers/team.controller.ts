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
import {Team, User, TeamMember} from '../models';
import {TeamRepository, UserRepository, TeamMemberRepository, DepartmentRepository} from '../repositories';
import { OPERATION_SECURITY_SPEC } from '../utils/security.spec';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class TeamController {
  constructor(
    @repository(TeamRepository)
    public teamRepository : TeamRepository,
    @repository(UserRepository)
    public userRepository : UserRepository,
    @repository(TeamMemberRepository)
    public teamMemberRepository : TeamMemberRepository,
  ) {}

  @post('/teams', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Team model instance',
        content: {'application/json': {schema: getModelSchemaRef(Team)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {
            title: 'NewTeam',
            exclude: ['id'],
          }),
        },
      },
    })
    team: Omit<Team, 'id'>,
  ): Promise<Team> {
    return this.teamRepository.create(team);
  }

  @get('/teams/count', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Team model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Team) where?: Where<Team>,
  ): Promise<Count> {
    return this.teamRepository.count(where);
  }

  @get('/teams', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Team model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Team, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Team) filter?: Filter<Team>,
  ): Promise<Team[]> {
    return this.teamRepository.find(filter);
  }

  @patch('/teams', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Team PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {partial: true}),
        },
      },
    })
    team: Team,
    @param.where(Team) where?: Where<Team>,
  ): Promise<Count> {
    return this.teamRepository.updateAll(team, where);
  }

  @get('/teams/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Team model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Team, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Team, {exclude: 'where'}) filter?: FilterExcludingWhere<Team>
  ): Promise<Team> {
    return this.teamRepository.findById(id, filter);
  }

  @patch('/teams/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Team PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {partial: true}),
        },
      },
    })
    team: Team,
  ): Promise<void> {
    await this.teamRepository.updateById(id, team);
  }

  @put('/teams/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Team PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() team: Team,
  ): Promise<void> {
    await this.teamRepository.replaceById(id, team);
  }

  @del('/teams/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Team DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.teamRepository.deleteById(id);
  }

  @post('/teams/{id}/member', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'TeamMember model instance',
        content: {'application/json': {schema: getModelSchemaRef(TeamMember)}},
      },
    },
  })
  async createTeamMember(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Number, {
            title: 'NewTeamMember User Id',
          }),
        },
      },
    })
    teamMemberUserId: number,
    @param.path.number("id")
    teamId: number,
  ): Promise<TeamMember> {
    let newTeamMember: TeamMember = new TeamMember();
    newTeamMember.teamId = teamId;
    newTeamMember.userId = teamMemberUserId;
    return this.teamMemberRepository.create(newTeamMember);
  }

  @get('/teams/{id}/members', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findUsersByTeamId(
    @param.path.number('id') id: number,
  ): Promise<User[]> {
    return this.userRepository.findUsersByTeamId(id);
  }
}
