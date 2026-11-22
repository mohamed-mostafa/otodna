import {DefaultCrudRepository} from '@loopback/repository';
import {Equipment, EquipmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EquipmentRepository extends DefaultCrudRepository<
  Equipment,
  typeof Equipment.prototype.id,
  EquipmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Equipment, dataSource);
  }
}
