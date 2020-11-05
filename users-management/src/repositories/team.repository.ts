import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Team, TeamRelations, TeamMember, Department} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TeamMemberRepository} from './team-member.repository';
import {DepartmentRepository} from './department.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly teamMembers: HasManyRepositoryFactory<TeamMember, typeof Team.prototype.id>;

  public readonly department: BelongsToAccessor<Department, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('TeamMemberRepository') protected teamMemberRepositoryGetter: Getter<TeamMemberRepository>, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Team, dataSource);
    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
    this.teamMembers = this.createHasManyRepositoryFactoryFor('teamMembers', teamMemberRepositoryGetter,);
    this.registerInclusionResolver('teamMembers', this.teamMembers.inclusionResolver);
  }
}
