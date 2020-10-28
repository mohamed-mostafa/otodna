import {DefaultCrudRepository} from '@loopback/repository';
import {Notification, NotificationRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NotificationRepository extends DefaultCrudRepository<
  Notification,
  typeof Notification.prototype.id,
  NotificationRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(Notification, dataSource);
  }
}
