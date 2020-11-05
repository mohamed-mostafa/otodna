import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Team,
  Department,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamDepartmentController {
  constructor(
    @repository(TeamRepository)
    public teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to Team',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department)},
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.number('id') id: typeof Team.prototype.id,
  ): Promise<Department> {
    return this.teamRepository.department(id);
  }
}
