import {DefaultCrudRepository} from '@loopback/repository';
import {PatientSession, PatientSessionRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientSessionRepository extends DefaultCrudRepository<
  PatientSession,
  typeof PatientSession.prototype.id,
  PatientSessionRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientSession, dataSource);
  }
}
