import {DefaultCrudRepository} from '@loopback/repository';
import {TeamMember, TeamMemberRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TeamMemberRepository extends DefaultCrudRepository<
  TeamMember,
  typeof TeamMember.prototype.id,
  TeamMemberRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(TeamMember, dataSource);
  }
  async findMemberAndDelete(teamId: number, userId: number): Promise<void> {
    let teamMember = await super.find({
      where: {teamId, userId},
    });
    return super.deleteById(teamMember[0].id);
  }
}
