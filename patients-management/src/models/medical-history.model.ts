import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'medical_history'},
  },
})
export class MedicalHistory extends Entity {
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
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'treatment_id',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  treatmentId: number;

  @property({
    type: 'string',
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'pathology_id',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  pathologyId: number;

  @property({
    type: 'string',
    length: 500,
    mysql: {
      columnName: 'conclusion',
      dataType: 'varchar',
      dataLength: 500,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  conclusion?: string;

  constructor(data?: Partial<MedicalHistory>) {
    super(data);
  }
}

export interface MedicalHistoryRelations {
  // describe navigational properties here
}

export type MedicalHistoryWithRelations = MedicalHistory &
  MedicalHistoryRelations;
