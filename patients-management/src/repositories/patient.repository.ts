import {PatientSearch} from './../models/patient-search.model';
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
    const filter: Filter<Patient> = {};
    filter.include = [{relation: 'patientMedicalInfo'}];
    return super.findById(id, filter);
  }

  public async advancedSearch(data: PatientSearch): Promise<any> {
    const filter: Filter<Patient> = {};
    const obj: any = {};
    const {firstName, lastName, mobile, email} = data;
    let {dateOfBirth} = data;
    if (firstName) {
      obj.firstName = {like: `%${firstName}%`};
    }
    if (lastName) {
      obj.lastName = {like: `%${lastName}%`};
    }
    if (mobile) {
      obj.mobile = {like: `%${mobile}%`};
    }
    if (email) {
      obj.email = {like: `%${email}%`};
    }
    if (dateOfBirth) {
      const fullYear = new Date(dateOfBirth).getFullYear();
      const month = String(new Date(dateOfBirth).getMonth() + 1).padStart(
        2,
        '0',
      );
      const day = String(new Date(dateOfBirth).getDate()).padStart(2, '0');
      const date = `${fullYear}-${month}-${day}`;
      dateOfBirth = date;
      obj.dateOfBirth = dateOfBirth;
    }
    filter.where = obj;
    return super.find(filter);
  }
  public async simpleSearch(data: Array<String>): Promise<Patient> {
    const filter: Filter<Patient> = {};
    let obj: any = {};
    const array: any = [];
    for (const element of data) {
      obj = {
        or: [
          {firstName: {like: `%${element}%`}},
          {lastName: {like: `%${element}%`}},
          {mobile: {like: `%${element}%`}},
          {email: {like: `%${element}%`}},
          {patientNumber: {like: `%${element}%`}},
        ],
      };
      filter.where = obj;
      const res = await super.find(filter);
      array.push(res);
    }
    const merged: any = [].concat.apply([], array);
    const uniqueValues = merged.reduce((unique: any, o: any) => {
      if (!unique.some((object: any) => object.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);
    return uniqueValues;
  }
}
