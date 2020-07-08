import {DefaultCrudRepository} from '@loopback/repository';
import {
  PatientDiagnosisSymptoms,
  PatientDiagnosisSymptomsRelations,
} from '../models/patient-diagnosis-symptoms.model';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientDiagnosisSymptomsRepository extends DefaultCrudRepository<
  PatientDiagnosisSymptoms,
  typeof PatientDiagnosisSymptoms.prototype.id,
  PatientDiagnosisSymptomsRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientDiagnosisSymptoms, dataSource);
  }
}
