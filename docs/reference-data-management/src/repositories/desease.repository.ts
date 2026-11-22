import {DefaultCrudRepository} from '@loopback/repository';
import {Desease, DeseaseRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DeseaseRepository extends DefaultCrudRepository<
  Desease,
  typeof Desease.prototype.id,
  DeseaseRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Desease, dataSource);
  }
}
