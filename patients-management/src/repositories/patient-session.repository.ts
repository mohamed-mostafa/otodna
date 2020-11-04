import {S3AdaptorService} from './../services/s-3-adaptor.service';
import {PatientSessionPathologyRepository} from './patient-session-pathology.repository';
import {SessionTreatmentRepository} from './session-treatment.repository';
import {
  DefaultTransactionalRepository,
  repository,
  Transaction,
} from '@loopback/repository';
import {PatientSession, PatientSessionRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, service} from '@loopback/core';
require('dotenv').config();

export class PatientSessionRepository extends DefaultTransactionalRepository<
  PatientSession,
  typeof PatientSession.prototype.id,
  PatientSessionRelations
> {
  allTreatments: any;
  allPathologies: any;
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
    @service(S3AdaptorService) public s3AdaptorService: S3AdaptorService,
  ) {
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
        this.allTreatments = await this.s3AdaptorService.getAllTreatments();
        this.allPathologies = await this.s3AdaptorService.getAllPathologies();
        const returnedData: any = [];
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
            if (this.allTreatments && result) {
              this.allTreatments.forEach((treat: any) => {
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
            if (this.allPathologies && result) {
              this.allPathologies.forEach((pathology: any) => {
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
}
