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
  public createParametersValues(data: Array<any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let handledData = await this.handleData(data);
      let equipments = data[0].equipments;
      const tx: Transaction = await this.beginTransaction();
      try {
        if (handledData && handledData.length > 0) {
          for (const d of handledData) {
            await super.create(d, {transaction: tx});
          }
        }
        if (equipments && equipments.length > 0) {
          for (const e of equipments) {
            let obj = {
              equipmentId: e.id,
              equipmentName: e.name,
              sessionTestId: data[0].sessionTestId,
            };
            await this.sessionTestEquipmentRepository.create(obj, {
              transaction: tx,
            });
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
  async handleData(data: Array<any>) {
    let AllData = [];
    for (const d of data) {
      for (const item of d.parameters) {
        if (item.type === 'list') {
          if (item.leftVal.name) {
            let leftObj = {
              parameterName: item.name,
              ear: 'left',
              parameterType: item.type,
              value: item.leftVal.name,
              sessionTestId: d.sessionTestId,
            };
            AllData.push(leftObj);
          }
          if (item.rightVal.name) {
            let rightObj = {
              parameterName: item.name,
              ear: 'right',
              parameterType: item.type,
              value: item.rightVal.name,
              sessionTestId: d.sessionTestId,
            };
            AllData.push(rightObj);
          }
        }
        if (item.type === 'number' || item.type === 'text') {
          if (item.leftVal) {
            let leftObj = {
              parameterName: item.name,
              ear: 'left',
              parameterType: item.type,
              value: item.leftVal,
              sessionTestId: d.sessionTestId,
            };
            AllData.push(leftObj);
          }
          if (item.rightVal) {
            let rightObj = {
              parameterName: item.name,
              ear: 'right',
              parameterType: item.type,
              value: item.rightVal,
              sessionTestId: d.sessionTestId,
            };
            AllData.push(rightObj);
          }
        }
        if (item.type === 'textarea') {
          if (item.textareaVal) {
            let obj = {
              parameterName: item.name,
              ear: 'both',
              parameterType: item.type,
              value: item.textareaVal,
              sessionTestId: d.sessionTestId,
            };
            AllData.push(obj);
          }
        }
        if (item.type === 'boolean') {
          if (item.leftVal && item.leftVal.length > 0) {
            let leftObj = {
              parameterName: item.name,
              ear: 'left',
              parameterType: item.type,
              value: item.leftVal[0],
              sessionTestId: d.sessionTestId,
            };
            AllData.push(leftObj);
          }
          if (item.rightVal && item.rightVal.length > 0) {
            let rightObj = {
              parameterName: item.name,
              ear: 'right',
              parameterType: item.type,
              value: item.rightVal[0],
              sessionTestId: d.sessionTestId,
            };
            AllData.push(rightObj);
          }
        }
        if (item.type === 'table') {
          if (item.cellType === 'number') {
            for (const cell of item.cells) {
              if (cell.left) {
                let leftObj = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'left',
                  parameterType: item.type,
                  value: cell.left,
                  sessionTestId: d.sessionTestId,
                };
                AllData.push(leftObj);
              }
              if (cell.right) {
                let rightObj = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'right',
                  parameterType: item.type,
                  value: cell.right,
                  sessionTestId: d.sessionTestId,
                };
                AllData.push(rightObj);
              }
            }
          }
          if (item.cellType === 'boolean') {
            for (const cell of item.cells) {
              if (cell.left.name) {
                let leftObj = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'left',
                  parameterType: item.type,
                  value: cell.left.name,
                  sessionTestId: d.sessionTestId,
                };
                AllData.push(leftObj);
              }
              if (cell.right.name) {
                let rightObj = {
                  parameterName: item.name,
                  subParameterName: cell.name,
                  ear: 'right',
                  parameterType: item.type,
                  value: cell.right.name,
                  sessionTestId: d.sessionTestId,
                };
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
