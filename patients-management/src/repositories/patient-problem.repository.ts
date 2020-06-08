import {DefaultCrudRepository} from '@loopback/repository';
import {PatientProblem, PatientProblemRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientProblemRepository extends DefaultCrudRepository<
  PatientProblem,
  typeof PatientProblem.prototype.id,
  PatientProblemRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientProblem, dataSource);
  }
}
