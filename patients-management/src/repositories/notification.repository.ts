import {DefaultCrudRepository} from '@loopback/repository';
import {Notification, NotificationRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NotificationRepository extends DefaultCrudRepository<
  Notification,
  typeof Notification.prototype.id,
  NotificationRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(Notification, dataSource);
  }
  public getAllNotificationsByTeams(teams: Array<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let notifications: any = [];
        let promise = new Promise((resolve, reject) => {
          teams.forEach(async (team, index, array) => {
            const result = await super.find({
              where: {teamId: team.id, seen: false},
            });
            if (result && result.length > 0) {
              notifications.push(...result);
            }
            if (index === array.length - 1) resolve();
          });
        });
        promise.then(() => {
          resolve(notifications);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
