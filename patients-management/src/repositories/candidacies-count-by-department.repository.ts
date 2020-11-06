import {DefaultCrudRepository} from '@loopback/repository';
import {
  candidaciesCountByDepartment,
  CandidaciesCountByDepartmentRelations,
} from '../models/candidacies-count-by-department.model';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CandidaciesCountByDepartmentRepository extends DefaultCrudRepository<
  candidaciesCountByDepartment,
  typeof candidaciesCountByDepartment.prototype.treatmentName,
  CandidaciesCountByDepartmentRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(candidaciesCountByDepartment, dataSource);
  }
}
