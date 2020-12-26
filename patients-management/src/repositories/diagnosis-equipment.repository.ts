import {DefaultCrudRepository} from '@loopback/repository';
import {DiagnosisEquipment, DiagnosisEquipmentRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DiagnosisEquipmentRepository extends DefaultCrudRepository<
  DiagnosisEquipment,
  typeof DiagnosisEquipment.prototype.id,
  DiagnosisEquipmentRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(DiagnosisEquipment, dataSource);
  }
}
