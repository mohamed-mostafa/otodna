import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {User, UserRelations, Role, UserType} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {UserTypeRepository} from './user-type.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  public readonly userType: BelongsToAccessor<UserType, typeof User.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('UserTypeRepository') protected userTypeRepositoryGetter: Getter<UserTypeRepository>,
    ) {
    super(User, dataSource);
    this.userType = this.createBelongsToAccessorFor('userType', userTypeRepositoryGetter,);
    this.registerInclusionResolver('userType', this.userType.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
