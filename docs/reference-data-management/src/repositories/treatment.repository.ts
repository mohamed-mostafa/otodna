import {DefaultCrudRepository} from '@loopback/repository';
import {Treatment, TreatmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TreatmentRepository extends DefaultCrudRepository<
  Treatment,
  typeof Treatment.prototype.id,
  TreatmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Treatment, dataSource);
  }
}
