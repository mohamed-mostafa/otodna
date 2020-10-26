import {DefaultCrudRepository} from '@loopback/repository';
import {PatientReferral, PatientReferralRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientReferralRepository extends DefaultCrudRepository<
  PatientReferral,
  typeof PatientReferral.prototype.id,
  PatientReferralRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientReferral, dataSource);
  }
}
