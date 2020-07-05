import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'patient_problem'},
  },
})
export class PatientProblem extends Entity {
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
      columnName: 'problem_status_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  problemStatusId: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'noted_date',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  notedDate: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {
      columnName: 'comment',
      dataType: 'varchar',
      dataLength: 500,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  comment?: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PatientProblem>) {
    super(data);
  }
}

export interface PatientProblemRelations {
  // describe navigational properties here
}

export type PatientProblemWithRelations = PatientProblem &
  PatientProblemRelations;
