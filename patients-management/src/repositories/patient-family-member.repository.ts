import {DefaultCrudRepository} from '@loopback/repository';
import {PatientFamilyMember, PatientFamilyMemberRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientFamilyMemberRepository extends DefaultCrudRepository<
  PatientFamilyMember,
  typeof PatientFamilyMember.prototype.id,
  PatientFamilyMemberRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(PatientFamilyMember, dataSource);
  }
}
