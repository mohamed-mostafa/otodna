import {DefaultCrudRepository} from '@loopback/repository';
import {SessionTreatmentEquipment, SessionTreatmentEquipmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionTreatmentEquipmentRepository extends DefaultCrudRepository<
  SessionTreatmentEquipment,
  typeof SessionTreatmentEquipment.prototype.id,
  SessionTreatmentEquipmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(SessionTreatmentEquipment, dataSource);
  }
}
