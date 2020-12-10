import {DefaultTransactionalRepository} from '@loopback/repository';
import {ParameterValue, ParameterValueRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParameterValueRepository extends DefaultTransactionalRepository<
  ParameterValue,
  typeof ParameterValue.prototype.id,
  ParameterValueRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(ParameterValue, dataSource);
  }
}
