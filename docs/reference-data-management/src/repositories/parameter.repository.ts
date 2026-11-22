import {DefaultCrudRepository} from '@loopback/repository';
import {Parameter, ParameterRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParameterRepository extends DefaultCrudRepository<
  Parameter,
  typeof Parameter.prototype.id,
  ParameterRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Parameter, dataSource);
  }
}
