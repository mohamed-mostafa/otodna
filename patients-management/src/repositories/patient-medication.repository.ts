import {DefaultCrudRepository} from '@loopback/repository';
import {PatientMedication, PatientMedicationRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientMedicationRepository extends DefaultCrudRepository<
  PatientMedication,
  typeof PatientMedication.prototype.id,
  PatientMedicationRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientMedication, dataSource);
  }
}
