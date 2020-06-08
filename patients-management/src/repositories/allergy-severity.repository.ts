import {DefaultCrudRepository} from '@loopback/repository';
import {AllergySeverity, AllergySeverityRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AllergySeverityRepository extends DefaultCrudRepository<
  AllergySeverity,
  typeof AllergySeverity.prototype.id,
  AllergySeverityRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(AllergySeverity, dataSource);
  }
}
