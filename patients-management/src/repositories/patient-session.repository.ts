import {PatientSessionPathologyRepository} from './patient-session-pathology.repository';
import {SessionTreatmentRepository} from './session-treatment.repository';
import {
  DefaultTransactionalRepository,
  repository,
  Transaction,
} from '@loopback/repository';
import {PatientSession, PatientSessionRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientSessionRepository extends DefaultTransactionalRepository<
  PatientSession,
  typeof PatientSession.prototype.id,
  PatientSessionRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientSession, dataSource);
  }
  @repository(SessionTreatmentRepository)
  private sessionTreatmentRepository: SessionTreatmentRepository;
  @repository(PatientSessionPathologyRepository)
  private patientSessionPathologyRepository: PatientSessionPathologyRepository;
  public getPatientSessionData(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        let returnedData: any = [];
        const data = await super.find({
          where: {patientId: id},
        });
        data.forEach(async element => {
          if (element.sessionTypeId === 1) {
            const result = await this.sessionTreatmentRepository.find(
              {
                where: {patientSessionId: element.id},
              },
              {
                transaction: tx,
              },
            );
            result.forEach(res => {
              returnedData.push({
                type: 'Treatment',
                value: res.treatmentName,
              });
            });
          }
          if (element.sessionTypeId === 0) {
            const result = await this.patientSessionPathologyRepository.find(
              {
                where: {patientSessionId: element.id},
              },
              {
                transaction: tx,
              },
            );
            result.forEach(res => {
              returnedData.push({
                type: 'Pathology',
                value: res.diseaseName,
              });
            });
          }
        });
        await tx.commit();
        resolve(returnedData);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }
}
