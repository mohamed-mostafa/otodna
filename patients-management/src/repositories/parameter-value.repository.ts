import {PatientSessionPathologyRepository} from './patient-session-pathology.repository';
import {SessionTreatmentEquipmentRepository} from './session-treatment-equipment.repository';
import {SessionTreatmentRepository} from './session-treatment.repository';
import {SessionTestRepository} from './session-test.repository';
import {SessionTestEquipmentRepository} from './session-test-equipment.repository';
import {
  Transaction,
  DefaultTransactionalRepository,
  repository,
} from '@loopback/repository';
import {ParameterValue, ParameterValueRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParameterValueRepository extends DefaultTransactionalRepository<
  ParameterValue,
  typeof ParameterValue.prototype.id,
  ParameterValueRelations
> {
  constructor(@inject('datasources.oltp_ds') dataSource: OltpDsDataSource) {
    super(ParameterValue, dataSource);
  }
  @repository(SessionTestEquipmentRepository)
  private sessionTestEquipmentRepository: SessionTestEquipmentRepository;
  @repository(SessionTestRepository)
  private sessionTestRepository: SessionTestRepository;
  @repository(SessionTreatmentRepository)
  private sessionTreatmentRepository: SessionTreatmentRepository;
  @repository(PatientSessionPathologyRepository)
  private patientSessionPathologyRepository: PatientSessionPathologyRepository;
  @repository(SessionTreatmentEquipmentRepository)
  private sessionTreatmentEquipmentRepository: SessionTreatmentEquipmentRepository;
  public createParametersValues(data: Array<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        if (data[0].sessionTestId) {
          let sessionTestObj = {
            testId: data[0].testId,
            testName: data[0].name,
            patientSessionId: data[0].sessionTestId,
          };
          let res = await this.sessionTestRepository.create(sessionTestObj);
          data[0].id = res.id;
          let handledData = await this.handleData(
            data,
            res.id,
            'sessionTestId',
          );
          let equipments = data[0].equipments;
          if (handledData && handledData.length > 0) {
            for (const d of handledData) {
              await super.create(d, {transaction: tx});
            }
          }
          if (equipments && equipments.length > 0) {
            for (const e of equipments) {
              let obj = {
                equipmentId: e.equipmentId,
                equipmentName: e.equipmentName,
                sessionTestId: res.id,
              };
              await this.sessionTestEquipmentRepository.create(obj, {
                transaction: tx,
              });
            }
          }
        } else if (data[0].sessionTreatmentId) {
          let sessionTestObj = {
            treatmentId: data[0].testId,
            treatmentName: data[0].name,
            patientSessionId: data[0].sessionTreatmentId,
          };
          let res = await this.sessionTreatmentRepository.create(
            sessionTestObj,
          );
          data[0].id = res.id;
          let handledData = await this.handleData(
            data,
            res.id,
            'sessionTreatmentId',
          );
          let equipments = data[0].equipments;
          if (handledData && handledData.length > 0) {
            for (const d of handledData) {
              await super.create(d, {transaction: tx});
            }
          }
          if (equipments && equipments.length > 0) {
            for (const e of equipments) {
              let obj = {
                equipmentId: e.equipmentId,
                equipmentName: e.equipmentName,
                sessionTreatmentId: res.id,
              };
              await this.sessionTreatmentEquipmentRepository.create(obj, {
                transaction: tx,
              });
            }
          }
        } else {
          let sessionTestObj = {
            diseaseId: data[0].testId,
            diseaseName: data[0].name,
            patientSessionId: data[0].sessionPathologyId,
          };
          let res = await this.patientSessionPathologyRepository.create(
            sessionTestObj,
          );
          data[0].id = res.id;
          let handledData = await this.handleData(
            data,
            res.id,
            'sessionPathologyId',
          );
          if (handledData && handledData.length > 0) {
            for (const d of handledData) {
              await super.create(d, {transaction: tx});
            }
          }
        }

        await tx.commit();
        resolve(data);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }
  public updateParametersValues(data: Array<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const tx: Transaction = await this.beginTransaction();
      try {
        if (data[0].sessionTestId) {
          await super.deleteAll({sessionTestId: data[0].id}, {transaction: tx});
          await this.sessionTestEquipmentRepository.deleteAll(
            {sessionTestId: data[0].id},
            {transaction: tx},
          );
          let handledData = await this.handleData(
            data,
            data[0].id,
            'sessionTestId',
          );
          let equipments = data[0].equipments;
          if (handledData && handledData.length > 0) {
            for (const d of handledData) {
              await super.create(d, {transaction: tx});
            }
          }
          if (equipments && equipments.length > 0) {
            for (const e of equipments) {
              let obj = {
                equipmentId: e.equipmentId,
                equipmentName: e.equipmentName,
                sessionTestId: data[0].id,
              };
              await this.sessionTestEquipmentRepository.create(obj, {
                transaction: tx,
              });
            }
          }
        } else if (data[0].sessionTreatmentId) {
          await super.deleteAll(
            {sessionTreatmentId: data[0].id},
            {transaction: tx},
          );
          await this.sessionTreatmentEquipmentRepository.deleteAll(
            {sessionTreatmentId: data[0].id},
            {transaction: tx},
          );
          let handledData = await this.handleData(
            data,
            data[0].id,
            'sessionTreatmentId',
          );
          let equipments = data[0].equipments;
          if (handledData && handledData.length > 0) {
            for (const d of handledData) {
              await super.create(d, {transaction: tx});
            }
          }
          if (equipments && equipments.length > 0) {
            for (const e of equipments) {
              let obj = {
                equipmentId: e.equipmentId,
                equipmentName: e.equipmentName,
                sessionTreatmentId: data[0].id,
              };
              await this.sessionTreatmentEquipmentRepository.create(obj, {
                transaction: tx,
              });
            }
          }
        } else {
          await super.deleteAll(
            {sessionPathologyId: data[0].id},
            {transaction: tx},
          );
          let handledData = await this.handleData(
            data,
            data[0].id,
            'sessionPathologyId',
          );
          if (handledData && handledData.length > 0) {
            for (const d of handledData) {
              await super.create(d, {transaction: tx});
            }
          }
        }
        await tx.commit();
        resolve(data);
      } catch (err) {
        await tx.rollback();
        reject(err);
      }
    });
  }
  async handleData(data: Array<any>, id: number, type: string) {
    let AllData = [];
    for (const d of data) {
      for (const item of d.parameters) {
        if (item.type === 'list' || item.type === 'listWithImage') {
          if (item.leftVal.name) {
            let leftObj: any = {
              parameterName: item.name,
              ear: 'left',
              parameterType: item.type,
              value: item.leftVal.name,
              // sessionTestId: id,
            };
            leftObj[type] = id;
            AllData.push(leftObj);
          }
          if (item.rightVal.name) {
            let rightObj: any = {
              parameterName: item.name,
              ear: 'right',
              parameterType: item.type,
              value: item.rightVal.name,
              // sessionTestId: id,
            };
            rightObj[type] = id;
            AllData.push(rightObj);
          }
        }
        if (
          item.type === 'number' ||
          item.type === 'text' ||
          item.type === 'radio'
        ) {
          if (item.leftVal) {
            let leftObj: any = {
              parameterName: item.name,
              ear: 'left',
              parameterType: item.type,
              value: item.leftVal,
              // sessionTestId: id,
            };
            leftObj[type] = id;
            AllData.push(leftObj);
          }
          if (item.rightVal) {
            let rightObj: any = {
              parameterName: item.name,
              ear: 'right',
              parameterType: item.type,
              value: item.rightVal,
              // sessionTestId: id,
            };
            rightObj[type] = id;
            AllData.push(rightObj);
          }
        }
        if (item.type === 'textarea') {
          if (item.textareaVal) {
            let obj: any = {
              parameterName: item.name,
              ear: 'both',
              parameterType: item.type,
              value: item.textareaVal,
              // sessionTestId: id,
            };
            obj[type] = id;
            AllData.push(obj);
          }
        }
        if (item.type === 'boolean') {
          if (item.leftVal && item.leftVal.length > 0) {
            let leftObj: any = {
              parameterName: item.name,
              ear: 'left',
              parameterType: item.type,
              value: item.leftVal[0],
              // sessionTestId: id,
            };
            leftObj[type] = id;
            AllData.push(leftObj);
          }
          if (item.rightVal && item.rightVal.length > 0) {
            let rightObj: any = {
              parameterName: item.name,
              ear: 'right',
              parameterType: item.type,
              value: item.rightVal[0],
              // sessionTestId: id,
            };
            rightObj[type] = id;
            AllData.push(rightObj);
          }
        }
        if (item.type === 'table') {
          if (item.cellType === 'number') {
            for (const cell of item.cells) {
              if (cell.left) {
                let leftObj: any = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'left',
                  parameterType: item.type,
                  value: cell.left,
                  // sessionTestId: id,
                };
                leftObj[type] = id;
                AllData.push(leftObj);
              }
              if (cell.right) {
                let rightObj: any = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'right',
                  parameterType: item.type,
                  value: cell.right,
                  // sessionTestId: id,
                };
                rightObj[type] = id;
                AllData.push(rightObj);
              }
            }
          }
          if (item.cellType === 'boolean') {
            for (const cell of item.cells) {
              if (cell.left.name) {
                let leftObj: any = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'left',
                  parameterType: item.type,
                  value: cell.left.name,
                  // sessionTestId: id,
                };
                leftObj[type] = id;
                AllData.push(leftObj);
              }
              if (cell.right.name) {
                let rightObj: any = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'right',
                  parameterType: item.type,
                  value: cell.right.name,
                  // sessionTestId: id,
                };
                rightObj[type] = id;
                AllData.push(rightObj);
              }
            }
          }
        }
      }
    }
    return AllData;
  }
}
