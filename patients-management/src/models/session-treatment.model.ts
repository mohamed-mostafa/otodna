import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'session_treatment'}
  }
})
export class SessionTreatment extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'treatment_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  treatmentId: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'treatment_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  treatmentName: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mysql: {columnName: 'candidancy', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N'},
  })
  candidancy: number;

  @property({
    type: 'string',
    required: true,
    length: 5,
    mysql: {columnName: 'ear', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  ear: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'patient_session_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  patientSessionId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SessionTreatment>) {
    super(data);
  }
}

export interface SessionTreatmentRelations {
  // describe navigational properties here
}

export type SessionTreatmentWithRelations = SessionTreatment & SessionTreatmentRelations;
