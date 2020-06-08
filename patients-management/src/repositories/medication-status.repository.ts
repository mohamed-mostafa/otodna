import {DefaultCrudRepository} from '@loopback/repository';
import {MedicationStatus, MedicationStatusRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MedicationStatusRepository extends DefaultCrudRepository<
  MedicationStatus,
  typeof MedicationStatus.prototype.id,
  MedicationStatusRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(MedicationStatus, dataSource);
  }
}
