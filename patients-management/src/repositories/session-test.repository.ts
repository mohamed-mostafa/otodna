import {DefaultCrudRepository} from '@loopback/repository';
import {SessionTest, SessionTestRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionTestRepository extends DefaultCrudRepository<
  SessionTest,
  typeof SessionTest.prototype.id,
  SessionTestRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(SessionTest, dataSource);
  }
}
