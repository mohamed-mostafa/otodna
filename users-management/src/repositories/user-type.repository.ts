import {DefaultCrudRepository} from '@loopback/repository';
import {UserType, UserTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserTypeRepository extends DefaultCrudRepository<
  UserType,
  typeof UserType.prototype.id,
  UserTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(UserType, dataSource);
  }
}
