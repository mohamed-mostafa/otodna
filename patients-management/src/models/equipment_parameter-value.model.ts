import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'equipment_parameter_value'},
  },
})
export class EquipmentParameterValue extends Entity {
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
      columnName: 'parameter_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  parameterName: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'sub_parameter_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  subParameterName: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'ear',
      dataType: 'char',
      dataLength: 5,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  ear: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'parameter_type',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  parameterType: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'value',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  value: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'unit',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  unit?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'equipment_test_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  equipmentTestId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'equipment_treatment_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  equipmentTreatmentId?: number;
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'equipment_pathology_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  equipmentPathologyId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EquipmentParameterValue>) {
    super(data);
  }
}

export interface EquipmentParameterValueRelations {
  // describe navigational properties here
}

export type EquipmentParameterValueWithRelations = EquipmentParameterValue &
  EquipmentParameterValueRelations;
