import {DefaultCrudRepository} from '@loopback/repository';
import {TestType, TestTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TestTypeRepository extends DefaultCrudRepository<
  TestType,
  typeof TestType.prototype.id,
  TestTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(TestType, dataSource);
  }
}
