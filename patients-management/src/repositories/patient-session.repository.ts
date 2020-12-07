import {ClinicalHistoryRepository} from './clinical-history.repository';
import {PatientSessionPathologyRepository} from './patient-session-pathology.repository';
import {SessionTreatmentRepository} from './session-treatment.repository';
import {
  DefaultTransactionalRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {
  PatientSession,
  PatientSessionRelations,
  SessionTest,
  SessionTreatment,
  PatientSessionPathology,
} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionTestRepository} from './session-test.repository';
import {constants} from 'fs';

export class PatientSessionRepository extends DefaultTransactionalRepository<
  PatientSession,
  typeof PatientSession.prototype.id,
  PatientSessionRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
    @repository.getter('SessionTestRepository')
    protected sessionTestRepositoryGetter: Getter<SessionTestRepository>,
    @repository.getter('SessionTreatmentRepository')
    protected sessionTreatmentRepositoryGetter: Getter<
      SessionTreatmentRepository
    >,
    @repository.getter('PatientSessionPathologyRepository')
    protected patientSessionPathologyRepositoryGetter: Getter<
      PatientSessionPathologyRepository
    >,
  ) {
    super(PatientSession, dataSource);
    this.patientSessionPathologies = this.createHasManyRepositoryFactoryFor(
      'patientSessionPathologies',
      patientSessionPathologyRepositoryGetter,
    );
    this.registerInclusionResolver(
      'patientSessionPathologies',
      this.patientSessionPathologies.inclusionResolver,
    );
    this.sessionTreatments = this.createHasManyRepositoryFactoryFor(
      'sessionTreatments',
      sessionTreatmentRepositoryGetter,
    );
    this.registerInclusionResolver(
      'sessionTreatments',
      this.sessionTreatments.inclusionResolver,
    );
    this.sessionTests = this.createHasManyRepositoryFactoryFor(
      'sessionTests',
      sessionTestRepositoryGetter,
    );
    this.registerInclusionResolver(
      'sessionTests',
      this.sessionTests.inclusionResolver,
    );
  }

  public readonly sessionTests: HasManyRepositoryFactory<
    SessionTest,
    typeof PatientSession.prototype.id
  >;

  public readonly sessionTreatments: HasManyRepositoryFactory<
    SessionTreatment,
    typeof PatientSession.prototype.id
  >;

  public readonly patientSessionPathologies: HasManyRepositoryFactory<
    PatientSessionPathology,
    typeof PatientSession.prototype.id
  >;
  @repository(ClinicalHistoryRepository)
  private clinicalHistoryRepository: ClinicalHistoryRepository;
  public getSessionsDiseasesAndRecommendation(patientId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const sessions = await super.find({
          where: {sessionTypeId: 0, patientId},
          include: [
            {relation: 'sessionTreatments'},
            {relation: 'patientSessionPathologies'},
          ],
        });
        let allTreatments: any = [];
        let allPathologies: any = [];
        for (const session of sessions) {
          if (session.sessionTreatments) {
            allTreatments.push(...session.sessionTreatments);
          }
          if (session.patientSessionPathologies) {
            allPathologies.push(...session.patientSessionPathologies);
          }
        }
        const uniqueTreatments = [
          ...new Map(
            allTreatments.map((item: any) => [item['treatmentId'], item]),
          ).values(),
        ];
        const uniquePathologies = [
          ...new Map(
            allPathologies.map((item: any) => [item['diseaseId'], item]),
          ).values(),
        ];
        let returnedData = [...uniqueTreatments, ...uniquePathologies];
        resolve(returnedData);
      } catch (err) {
        reject(err);
      }
    });
  }
  public getAllSessionsWithPatientId(patientId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.find({
          where: {patientId},
          include: [
            {relation: 'sessionTests'},
            {relation: 'sessionTreatments'},
            {relation: 'patientSessionPathologies'},
          ],
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
  public getPatientHistoryData(patientId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let patientHistoryData: any = [];
        const patientSession = await super.find({
          where: {patientId},
        });
        const clinicalHistory = await this.clinicalHistoryRepository.find({
          where: {patientId},
        });
        patientHistoryData.push(...patientSession);
        patientHistoryData.push(...clinicalHistory);
        patientHistoryData.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        resolve(patientHistoryData);
      } catch (err) {
        reject(err);
      }
    });
  }
  public getLastSessionByType(
    sessionTypeId: number,
    patientId: number,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.find({
          order: ['id DESC'],
          limit: 1,
          where: {sessionTypeId, patientId},
          include: [
            {relation: 'sessionTests'},
            {relation: 'sessionTreatments'},
            {relation: 'patientSessionPathologies'},
          ],
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
  public getLastTestByDepartmentId(
    patientId: number,
    departmentId: number,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const sessions = await super.find({
          order: ['id DESC'],
          where: {patientId, departmentId},
          include: [{relation: 'sessionTests'}],
        });
        let last;
        if (sessions && sessions.length > 0) {
          for (const session of sessions) {
            if (session.sessionTests) {
              [last] = session.sessionTests.slice(-1);
              break;
            }
          }
          resolve(last);
        } else {
          resolve({testName: 'No tests found'});
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
