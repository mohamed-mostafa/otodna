import {DefaultCrudRepository} from '@loopback/repository';
import {PatientMedicalInfo, PatientMedicalInfoRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientMedicalInfoRepository extends DefaultCrudRepository<
  PatientMedicalInfo,
  typeof PatientMedicalInfo.prototype.patientId,
  PatientMedicalInfoRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientMedicalInfo, dataSource);
  }
}
