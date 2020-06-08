import {DefaultCrudRepository} from '@loopback/repository';
import {TeamMember, TeamMemberRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TeamMemberRepository extends DefaultCrudRepository<
  TeamMember,
  typeof TeamMember.prototype.id,
  TeamMemberRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(TeamMember, dataSource);
  }
}
