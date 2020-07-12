import {
  Transaction,
  DefaultTransactionalRepository,
} from '@loopback/repository';
import {PatientSessionSymptom, PatientSessionSymptomRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PatientSessionSymptomRepository extends DefaultTransactionalRepository<
  PatientSessionSymptom,
  typeof PatientSessionSymptom.prototype.id,
  PatientSessionSymptomRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(PatientSessionSymptom, dataSource);
  }
  public createDiagnosisSymptom(data: Array<Object>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        for (const d of data) {
          await super.create(d, {transaction: tx});
        }
        await tx.commit();
        resolve(data);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }
}
