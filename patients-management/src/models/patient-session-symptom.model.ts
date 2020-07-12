import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'patient_session_symptom'},
  },
})
export class PatientSessionSymptom extends Entity {
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
      columnName: 'patient_session_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  patientSessionId: number;

  @property({
    type: 'string',
    required: true,
    length: 5,
    mysql: {
      columnName: 'ear',
      dataType: 'varchar',
      dataLength: 5,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  ear: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'symptom_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  symptomId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PatientSessionSymptom>) {
    super(data);
  }
}

export interface PatientSessionSymptomRelations {
  // describe navigational properties here
}

export type PatientSessionSymptomWithRelations = PatientSessionSymptom &
  PatientSessionSymptomRelations;
