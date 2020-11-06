import {DefaultCrudRepository} from '@loopback/repository';
import {PathologiesCountByDepartment, PathologiesCountByDepartmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PathologiesCountByDepartmentRepository extends DefaultCrudRepository<
  PathologiesCountByDepartment,
  typeof PathologiesCountByDepartment.prototype.deseaseName,
  PathologiesCountByDepartmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PathologiesCountByDepartment, dataSource);
  }
}
