import {DefaultCrudRepository} from '@loopback/repository';
import {TreatmentsCountByDepartment, TreatmentsCountByDepartmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatmentsCountByDepartmentRepository extends DefaultCrudRepository<
  TreatmentsCountByDepartment,
  typeof TreatmentsCountByDepartment.prototype.treatmentName,
  TreatmentsCountByDepartmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(TreatmentsCountByDepartment, dataSource);
  }
}
