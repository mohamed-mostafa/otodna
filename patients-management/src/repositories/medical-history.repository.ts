import {DefaultCrudRepository} from '@loopback/repository';
import {MedicalHistory, MedicalHistoryRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MedicalHistoryRepository extends DefaultCrudRepository<
  MedicalHistory,
  typeof MedicalHistory.prototype.id,
  MedicalHistoryRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(MedicalHistory, dataSource);
  }
}
