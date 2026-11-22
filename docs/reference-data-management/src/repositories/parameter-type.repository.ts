import {DefaultCrudRepository} from '@loopback/repository';
import {ParameterType, ParameterTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParameterTypeRepository extends DefaultCrudRepository<
  ParameterType,
  typeof ParameterType.prototype.id,
  ParameterTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(ParameterType, dataSource);
  }
}
