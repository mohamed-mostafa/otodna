import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'symptoms'},
  },
})
export class PatientDiagnosisSymptoms extends Entity {
  @property({
    type: 'number',
    required: true,
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
      columnName: 'name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  name: string;

  constructor(data?: Partial<PatientDiagnosisSymptoms>) {
    super(data);
  }
}

export interface PatientDiagnosisSymptomsRelations {
  // describe navigational properties here
}

export type PatientDiagnosisSymptomsWithRelations = PatientDiagnosisSymptoms &
  PatientDiagnosisSymptomsRelations;
