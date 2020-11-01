import {NotificationRepository} from './notification.repository';
import {
  Transaction,
  DefaultTransactionalRepository,
  repository,
} from '@loopback/repository';
import {PatientReferral, PatientReferralRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientReferralRepository extends DefaultTransactionalRepository<
  PatientReferral,
  typeof PatientReferral.prototype.id,
  PatientReferralRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientReferral, dataSource);
  }
  @repository(NotificationRepository)
  private notificationRepository: NotificationRepository;
  public createPatientReferral(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        const name = data.patientName;
        const notification: any = {
          date: new Date(),
          notificationText: `Patient ${name} has been referred to you`,
          teamId: data.teamId,
          teamOwnerId: data.teamOwnerId,
        };
        delete data.teamOwnerId;
        delete data.patientName;
        await super.create(data, {transaction: tx});
        await this.notificationRepository.create(notification, {
          transaction: tx,
        });
        await tx.commit();
        resolve(data);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }
}
