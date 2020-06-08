import {DefaultCrudRepository} from '@loopback/repository';
import {PatientImmunization, PatientImmunizationRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientImmunizationRepository extends DefaultCrudRepository<
  PatientImmunization,
  typeof PatientImmunization.prototype.id,
  PatientImmunizationRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientImmunization, dataSource);
  }
}
