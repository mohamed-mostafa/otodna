import {DefaultCrudRepository} from '@loopback/repository';
import {AllergyType, AllergyTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AllergyTypeRepository extends DefaultCrudRepository<
  AllergyType,
  typeof AllergyType.prototype.id,
  AllergyTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(AllergyType, dataSource);
  }
}
