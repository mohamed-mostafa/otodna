import {DefaultCrudRepository} from '@loopback/repository';
import {FamilyMemberRelationType, FamilyMemberRelationTypeRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FamilyMemberRelationTypeRepository extends DefaultCrudRepository<
  FamilyMemberRelationType,
  typeof FamilyMemberRelationType.prototype.id,
  FamilyMemberRelationTypeRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(FamilyMemberRelationType, dataSource);
  }
}
