import {DefaultCrudRepository} from '@loopback/repository';
import {Symptom, SymptomRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SymptomRepository extends DefaultCrudRepository<
  Symptom,
  typeof Symptom.prototype.id,
  SymptomRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Symptom, dataSource);
  }
}
