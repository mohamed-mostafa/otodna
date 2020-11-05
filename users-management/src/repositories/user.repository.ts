import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Role, UserType, TeamMember, Team} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {UserTypeRepository} from './user-type.repository';
import {TeamMemberRepository} from './team-member.repository';
import {TeamRepository} from './team.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  public readonly userType: BelongsToAccessor<UserType, typeof User.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
     @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
     @repository.getter('UserTypeRepository') protected userTypeRepositoryGetter: Getter<UserTypeRepository>,
     @repository(TeamMemberRepository) protected teamMemberRepository: TeamMemberRepository,
     @repository(TeamRepository) protected teamRepository: TeamRepository,
    ) {
    super(User, dataSource);
    this.userType = this.createBelongsToAccessorFor('userType', userTypeRepositoryGetter,);
    this.registerInclusionResolver('userType', this.userType.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }

  async findUsersByTeamId(id: number): Promise<User[]> {
    let teamMembers: TeamMember[] = await this.teamMemberRepository.find({where: {teamId: id}});
    if (!teamMembers || teamMembers.length == 0) return [];
    return this.find({where: {id: {inq: teamMembers.map(teamMember => teamMember.userId)}}, fields: {password: false}, include: [{relation: "userType"}, {relation: "role"}]});;
    // return this.dataSource.execute("SELECT u.* FROM user u JOIN team_member tm ON U.id = tm.user_id JOIN team t ON t.id = tm.team_id WHERE tm.team_id = ?", [id])
  }

  async getTeamMembershipsOfUser(userId: Number): Promise<Team[]> {
    const teamMemberObjects: TeamMember[] = await this.teamMemberRepository.find({where: {userId: userId}});
    if (!teamMemberObjects || teamMemberObjects.length == 0) return [];
    return this.teamRepository.find({where: {id: {inq: teamMemberObjects.map(teamMember => teamMember.teamId)}}, include: [{relation: "department"}]});
  }
}
