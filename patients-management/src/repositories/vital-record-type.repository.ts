import {DefaultCrudRepository} from '@loopback/repository';
import {VitalRecordType, VitalRecordTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VitalRecordTypeRepository extends DefaultCrudRepository<
  VitalRecordType,
  typeof VitalRecordType.prototype.id,
  VitalRecordTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(VitalRecordType, dataSource);
  }
}
