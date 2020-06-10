import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Role, UserType, TeamMember} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {UserTypeRepository} from './user-type.repository';
import {TeamMemberRepository} from './team-member.repository';

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
    ) {
    super(User, dataSource);
    this.userType = this.createBelongsToAccessorFor('userType', userTypeRepositoryGetter,);
    this.registerInclusionResolver('userType', this.userType.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }

  async findUsersByTeamId(id: number): Promise<User[]> {
    let teamMembers: TeamMember[] = await this.teamMemberRepository.find({where: {teamId: id}});
    if (!teamMembers) return [];
    return this.find({where: {id: {inq: teamMembers.map(teamMember => teamMember.id)}}, fields: {password: false}, include: [{relation: "userType"}, {relation: "role"}]});;
    // return this.dataSource.execute("SELECT u.* FROM user u JOIN team_member tm ON U.id = tm.user_id JOIN team t ON t.id = tm.team_id WHERE tm.team_id = ?", [id])
  }
}
