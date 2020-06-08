import {DefaultCrudRepository} from '@loopback/repository';
import {PatientSessionPathology, PatientSessionPathologyRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientSessionPathologyRepository extends DefaultCrudRepository<
  PatientSessionPathology,
  typeof PatientSessionPathology.prototype.id,
  PatientSessionPathologyRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientSessionPathology, dataSource);
  }
}
