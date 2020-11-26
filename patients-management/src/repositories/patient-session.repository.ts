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
  @repository(SessionTreatmentRepository)
  private sessionTreatmentRepository: SessionTreatmentRepository;

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
  @repository(PatientSessionPathologyRepository)
  private patientSessionPathologyRepository: PatientSessionPathologyRepository;
  public getLastSessionDiseasesAndRecommendation(
    patientId: number,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await super.find({
          limit: 1,
          order: ['id DESC'],
          where: {sessionTypeId: 0, patientId},
        });
        let id = data[0].id;
        const treatments = await this.sessionTreatmentRepository.find({
          where: {patientSessionId: id},
        });
        const uniqueTreatments = [
          ...new Map(
            treatments.map((item: any) => [item['treatmentId'], item]),
          ).values(),
        ];
        const pathologies = await this.patientSessionPathologyRepository.find({
          where: {patientSessionId: id},
        });
        const uniquePathologies = [
          ...new Map(
            pathologies.map((item: any) => [item['diseaseId'], item]),
          ).values(),
        ];
        let returnedData = [...uniqueTreatments, ...uniquePathologies];
        resolve(returnedData);
      } catch (err) {
        reject(err);
      }
    });
  }
}
