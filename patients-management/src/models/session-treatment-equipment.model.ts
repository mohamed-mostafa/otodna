import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'session_treatment_equipment'},
  },
})
export class SessionTreatmentEquipment extends Entity {
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
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'equipment_id',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  equipmentId: number;

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
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'session_treatment_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  sessionTreatmentId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SessionTreatmentEquipment>) {
    super(data);
  }
}

export interface SessionTreatmentEquipmentRelations {
  // describe navigational properties here
}

export type SessionTreatmentEquipmentWithRelations = SessionTreatmentEquipment &
  SessionTreatmentEquipmentRelations;
