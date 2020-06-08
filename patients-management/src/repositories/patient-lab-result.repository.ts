import {DefaultCrudRepository} from '@loopback/repository';
import {PatientLabResult, PatientLabResultRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientLabResultRepository extends DefaultCrudRepository<
  PatientLabResult,
  typeof PatientLabResult.prototype.id,
  PatientLabResultRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientLabResult, dataSource);
  }
}
