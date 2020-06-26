import {
  repository,
  HasOneRepositoryFactory,
  DefaultTransactionalRepository,
  Transaction,
  FilterBuilder,
  Filter,
} from '@loopback/repository';
import {Patient, PatientRelations, PatientMedicalInfo} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PatientMedicalInfoRepository} from './patient-medical-info.repository';
import {PatientAndMedicalInfo} from '../models/patient-and-medical-info.model';

export class PatientRepository extends DefaultTransactionalRepository<
  Patient,
  typeof Patient.prototype.id,
  PatientRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
    @repository.getter('PatientMedicalInfoRepository')
    protected patientMedicalInfoRepositoryGetter: Getter<
      PatientMedicalInfoRepository
    >,
  ) {
    super(Patient, dataSource);
    this.patientBasicInfo = this.createHasOneRepositoryFactoryFor(
      'patientBasicInfo',
      patientMedicalInfoRepositoryGetter,
    );
    this.registerInclusionResolver(
      'patientBasicInfo',
      this.patientBasicInfo.inclusionResolver,
    );
    this.patientMedicalInfo = this.createHasOneRepositoryFactoryFor(
      'patientMedicalInfo',
      patientMedicalInfoRepositoryGetter,
    );
    this.registerInclusionResolver(
      'patientMedicalInfo',
      this.patientMedicalInfo.inclusionResolver,
    );
  }

  public readonly patientMedicalInfo: HasOneRepositoryFactory<
    PatientMedicalInfo,
    typeof Patient.prototype.id
  >;

  public readonly patientBasicInfo: HasOneRepositoryFactory<
    PatientMedicalInfo,
    typeof Patient.prototype.id
  >;
  @repository(PatientMedicalInfoRepository)
  private patientMedicalInfoRepository: PatientMedicalInfoRepository;

  public createWithMedicalInfo(
    patientWithMedicalInfo: PatientAndMedicalInfo,
  ): Promise<PatientAndMedicalInfo> {
    return new Promise(async (resolve, reject) => {
      let tx: Transaction = await this.beginTransaction();
      try {
        let newPatientWithMedicalInfo: PatientAndMedicalInfo = new PatientAndMedicalInfo();
        newPatientWithMedicalInfo.patient = await super.create(
          patientWithMedicalInfo.patient,
          {transaction: tx},
        );
        if (patientWithMedicalInfo.patientMedicalInfo) {
          patientWithMedicalInfo.patientMedicalInfo.patientId =
            newPatientWithMedicalInfo.patient.id;
          newPatientWithMedicalInfo.patientMedicalInfo = await this.patientMedicalInfoRepository.create(
            patientWithMedicalInfo.patientMedicalInfo,
          );
        }
        await tx.commit();
        resolve(newPatientWithMedicalInfo);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }

  public updateWithMedicalInfo(
    id: number,
    patientWithMedicalInfo: PatientAndMedicalInfo,
  ): Promise<PatientAndMedicalInfo> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        await super.updateById(id, patientWithMedicalInfo.patient, {
          transaction: tx,
        });

        if (patientWithMedicalInfo.patientMedicalInfo) {
          patientWithMedicalInfo.patientMedicalInfo.patientId = id;
          await this.patientMedicalInfoRepository.updateById(
            id,
            patientWithMedicalInfo.patientMedicalInfo,
          );
        }
        await tx.commit();

        resolve(patientWithMedicalInfo);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }

  public getWithMedicalInfo(id: number): Promise<Patient> {
    let filter: Filter<Patient> = {};
    filter.include = [{relation: 'patientMedicalInfo'}];
    return super.findById(id, filter);
  }
}
