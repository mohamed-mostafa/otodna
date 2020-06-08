import {DefaultCrudRepository} from '@loopback/repository';
import {PatientAllergy, PatientAllergyRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientAllergyRepository extends DefaultCrudRepository<
  PatientAllergy,
  typeof PatientAllergy.prototype.id,
  PatientAllergyRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientAllergy, dataSource);
  }
}
