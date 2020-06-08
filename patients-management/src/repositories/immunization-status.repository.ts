import {DefaultCrudRepository} from '@loopback/repository';
import {ImmunizationStatus, ImmunizationStatusRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ImmunizationStatusRepository extends DefaultCrudRepository<
  ImmunizationStatus,
  typeof ImmunizationStatus.prototype.id,
  ImmunizationStatusRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(ImmunizationStatus, dataSource);
  }
}
