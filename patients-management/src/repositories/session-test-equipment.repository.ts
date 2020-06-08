import {DefaultCrudRepository} from '@loopback/repository';
import {SessionTestEquipment, SessionTestEquipmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionTestEquipmentRepository extends DefaultCrudRepository<
  SessionTestEquipment,
  typeof SessionTestEquipment.prototype.id,
  SessionTestEquipmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(SessionTestEquipment, dataSource);
  }
}
