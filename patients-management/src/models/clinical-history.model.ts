import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'clinical_history'},
  },
})
export class ClinicalHistory extends Entity {
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
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'patient_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  patientId: number;

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
    length: 45,
    mysql: {
      columnName: 'treatment_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  treatmentName: string;

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
    required: false,
    length: 45,
    mysql: {
      columnName: 'pathology_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  pathologyName: string;

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
    type: 'date',
    required: true,
    mysql: {
      columnName: 'date',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  date: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {
      columnName: 'description',
      dataType: 'varchar',
      dataLength: 500,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  description?: string;

  constructor(data?: Partial<ClinicalHistory>) {
    super(data);
  }
}

export interface ClinicalHistoryRelations {
  // describe navigational properties here
}

export type ClinicalHistoryWithRelations = ClinicalHistory &
  ClinicalHistoryRelations;
