import {DefaultCrudRepository} from '@loopback/repository';
import {SessionTreatment, SessionTreatmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionTreatmentRepository extends DefaultCrudRepository<
  SessionTreatment,
  typeof SessionTreatment.prototype.id,
  SessionTreatmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(SessionTreatment, dataSource);
  }
}
