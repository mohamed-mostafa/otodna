import {DefaultCrudRepository} from '@loopback/repository';
import {PatientSessionSymptom, PatientSessionSymptomRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientSessionSymptomRepository extends DefaultCrudRepository<
  PatientSessionSymptom,
  typeof PatientSessionSymptom.prototype.id,
  PatientSessionSymptomRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientSessionSymptom, dataSource);
  }
}
