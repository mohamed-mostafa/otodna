import {DefaultCrudRepository} from '@loopback/repository';
import {TreatmentType, TreatmentTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatmentTypeRepository extends DefaultCrudRepository<
  TreatmentType,
  typeof TreatmentType.prototype.id,
  TreatmentTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(TreatmentType, dataSource);
  }
}
