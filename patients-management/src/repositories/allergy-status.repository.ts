import {DefaultCrudRepository} from '@loopback/repository';
import {AllergyStatus, AllergyStatusRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AllergyStatusRepository extends DefaultCrudRepository<
  AllergyStatus,
  typeof AllergyStatus.prototype.id,
  AllergyStatusRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(AllergyStatus, dataSource);
  }
}
