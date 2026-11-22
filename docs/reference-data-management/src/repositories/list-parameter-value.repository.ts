import {DefaultCrudRepository} from '@loopback/repository';
import {ListParameterValue, ListParameterValueRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ListParameterValueRepository extends DefaultCrudRepository<
  ListParameterValue,
  typeof ListParameterValue.prototype.id,
  ListParameterValueRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(ListParameterValue, dataSource);
  }
}
