import {DefaultCrudRepository} from '@loopback/repository';
import {PatientVitalRecord, PatientVitalRecordRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientVitalRecordRepository extends DefaultCrudRepository<
  PatientVitalRecord,
  typeof PatientVitalRecord.prototype.id,
  PatientVitalRecordRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientVitalRecord, dataSource);
  }
}
