import {DefaultCrudRepository} from '@loopback/repository';
import {
  PatientDiagnosisBasicInfo,
  PatientDiagnosisBasicInfoRelations,
} from '../models/patient-diagnosis-basic-info.model';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientDiagnosisBasicInfoRepository extends DefaultCrudRepository<
  PatientDiagnosisBasicInfo,
  typeof PatientDiagnosisBasicInfo.prototype.id,
  PatientDiagnosisBasicInfoRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientDiagnosisBasicInfo, dataSource);
  }
}
