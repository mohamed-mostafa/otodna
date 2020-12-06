import {DefaultCrudRepository} from '@loopback/repository';
import {ClinicalHistory, ClinicalHistoryRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClinicalHistoryRepository extends DefaultCrudRepository<
  ClinicalHistory,
  typeof ClinicalHistory.prototype.id,
  ClinicalHistoryRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(ClinicalHistory, dataSource);
  }
}
