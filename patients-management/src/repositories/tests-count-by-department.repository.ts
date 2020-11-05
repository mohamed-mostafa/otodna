import {DefaultCrudRepository} from '@loopback/repository';
import {TestsCountByDepartment, TestsCountByDepartmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TestsCountByDepartmentRepository extends DefaultCrudRepository<
  TestsCountByDepartment,
  typeof TestsCountByDepartment.prototype.testName,
  TestsCountByDepartmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(TestsCountByDepartment, dataSource);
  }
}
