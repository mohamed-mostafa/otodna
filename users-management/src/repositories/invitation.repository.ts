import {DefaultCrudRepository} from '@loopback/repository';
import {Invitation, InvitationRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InvitationRepository extends DefaultCrudRepository<
  Invitation,
  typeof Invitation.prototype.id,
  InvitationRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Invitation, dataSource);
  }
}
