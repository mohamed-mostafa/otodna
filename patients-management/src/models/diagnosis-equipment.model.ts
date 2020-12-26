import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'diagnosis_equipment'},
  },
})
export class DiagnosisEquipment extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'equipment_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  equipmentName: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'manufacturer_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  manufacturerName: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'serial_number',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  serialNumber: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'test_id',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  testId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
  constructor(data?: Partial<DiagnosisEquipment>) {
    super(data);
  }
}

export interface DiagnosisEquipmentRelations {
  // describe navigational properties here
}

export type DiagnosisEquipmentWithRelations = DiagnosisEquipment &
  DiagnosisEquipmentRelations;
