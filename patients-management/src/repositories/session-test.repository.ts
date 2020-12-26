import {PatientSessionRepository} from './patient-session.repository';
import {
  Transaction,
  DefaultTransactionalRepository,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SessionTest, SessionTestRelations, ParameterValue, SessionTestEquipment} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ParameterValueRepository} from './parameter-value.repository';
import {SessionTestEquipmentRepository} from './session-test-equipment.repository';

export class SessionTestRepository extends DefaultTransactionalRepository<
  SessionTest,
  typeof SessionTest.prototype.id,
  SessionTestRelations
> {
  items: any = [];

  public readonly parameterValues: HasManyRepositoryFactory<ParameterValue, typeof SessionTest.prototype.id>;

  public readonly sessionTestEquipments: HasManyRepositoryFactory<SessionTestEquipment, typeof SessionTest.prototype.id>;

  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('ParameterValueRepository') protected parameterValueRepositoryGetter: Getter<ParameterValueRepository>, @repository.getter('SessionTestEquipmentRepository') protected sessionTestEquipmentRepositoryGetter: Getter<SessionTestEquipmentRepository>,) {
    super(SessionTest, dataSource);
    this.sessionTestEquipments = this.createHasManyRepositoryFactoryFor('sessionTestEquipments', sessionTestEquipmentRepositoryGetter,);
    this.registerInclusionResolver('sessionTestEquipments', this.sessionTestEquipments.inclusionResolver);
    this.parameterValues = this.createHasManyRepositoryFactoryFor('parameterValues', parameterValueRepositoryGetter,);
    this.registerInclusionResolver('parameterValues', this.parameterValues.inclusionResolver);
  }
  // @repository(PatientSessionRepository)
  // private patientSessionRepository: PatientSessionRepository;
  // public getFrequentlyUsedTests(id: number): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     const tx: Transaction = await this.beginTransaction();
  //     try {
  //       const data = await this.patientSessionRepository.find({
  //         where: {departmentId: id},
  //       });
  //       const items = await this.getTestsBySessionId(data);
  //       await tx.commit();
  //       resolve(items);
  //     } catch (err) {
  //       await tx.rollback();
  //       reject(err);
  //     }
  //   });
  // }
  // async getTestsBySessionId(data: any) {
  //   let result: any = [];
  //   for (const element of data) {
  //     const res = await super.find({
  //       where: {patientSessionId: element.id},
  //     });
  //     result = [...result, ...res];
  //   }
  //   return result;
  // }
}
