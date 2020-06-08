import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'patient_medical_info'}
  }
})
export class PatientMedicalInfo extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'patient_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  patientId: number;

  @property({
    type: 'string',
    length: 3,
    mysql: {columnName: 'blood_type', dataType: 'varchar', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  bloodType?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'emergency_contact', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  emergencyContact?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'emergency_phone', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  emergencyPhone?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PatientMedicalInfo>) {
    super(data);
  }
}

export interface PatientMedicalInfoRelations {
  // describe navigational properties here
}

export type PatientMedicalInfoWithRelations = PatientMedicalInfo & PatientMedicalInfoRelations;
