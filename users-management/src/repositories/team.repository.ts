import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Team, TeamRelations, TeamMember} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TeamMemberRepository} from './team-member.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly teamMembers: HasManyRepositoryFactory<TeamMember, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('TeamMemberRepository') protected teamMemberRepositoryGetter: Getter<TeamMemberRepository>,
  ) {
    super(Team, dataSource);
    this.teamMembers = this.createHasManyRepositoryFactoryFor('teamMembers', teamMemberRepositoryGetter,);
    this.registerInclusionResolver('teamMembers', this.teamMembers.inclusionResolver);
  }
}
