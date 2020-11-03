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
import {S3} from 'aws-sdk/clients/all';
export class PatientSessionRepository extends DefaultTransactionalRepository<
  PatientSession,
  typeof PatientSession.prototype.id,
  PatientSessionRelations
> {
  secret: any;
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientSession, dataSource);
    this.secret = new S3({
      accessKeyId: 'AKIAJIOWDS66QFPZS52A',
      secretAccessKey: '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',
      region: 'ap-southeast-1',
    });
    this.getAllTreatments();
  }
  @repository(SessionTreatmentRepository)
  private sessionTreatmentRepository: SessionTreatmentRepository;
  @repository(PatientSessionPathologyRepository)
  private patientSessionPathologyRepository: PatientSessionPathologyRepository;
  public getPatientSessionData(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        const returnedData: any = [];
        const allTreatments: any = await this.getAllTreatments().catch(
          error => {
            reject(error);
          },
        );
        const allPathologies: any = await this.getAllPathologies().catch(
          error => {
            reject(error);
          },
        );
        const data = await super.find({
          where: {patientId: id},
        });
        data.forEach(async element => {
          if (element.sessionTypeId === 1) {
            const result = await this.sessionTreatmentRepository
              .find(
                {
                  where: {patientSessionId: element.id},
                },
                {
                  transaction: tx,
                },
              )
              .catch(error => {
                reject(error);
              });
            if (allTreatments && result) {
              allTreatments.forEach((treat: any) => {
                result.forEach(res => {
                  if (treat.treatmentId === res.treatmentId) {
                    returnedData.push({
                      type: 'Treatment',
                      value: res.treatmentName,
                    });
                  }
                });
              });
            }
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
            if (allPathologies && result) {
              allPathologies.forEach((pathology: any) => {
                result.forEach(res => {
                  if (pathology.diseaseId === res.diseaseId) {
                    returnedData.push({
                      type: 'Pathology',
                      value: res.diseaseName,
                    });
                  }
                });
              });
            }
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
  async getAllTreatments() {
    return new Promise((resolve, reject) => {
      const bucket = this.secret;
      const params = {
        Bucket: 'otonda-upload-file',
        Key: `assets/tests/treatmentTests.json`,
        ResponseContentType: 'application/json',
      };
      bucket.getObject(params, (err: any, items: any) => {
        if (err) {
          reject(JSON.stringify(err));
        } else {
          resolve(JSON.parse(items.Body.toString()).taggedTreatments);
        }
      });
    });
  }
  async getAllPathologies() {
    return new Promise((resolve, reject) => {
      const bucket = this.secret;
      const params = {
        Bucket: 'otonda-upload-file',
        Key: `assets/tests/diagnosisPathology.json`,
        ResponseContentType: 'application/json',
      };
      bucket.getObject(params, (err: any, items: any) => {
        if (err) {
          reject(JSON.stringify(err));
        } else {
          resolve(JSON.parse(items.Body.toString()).taggedPathologies);
        }
      });
    });
  }
}
