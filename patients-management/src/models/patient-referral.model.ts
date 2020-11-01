import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'patient_referral'},
  },
})
export class PatientReferral extends Entity {
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
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'team_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  teamId: number;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'team_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  teamName?: string;

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
    length: 5,
    mysql: {
      columnName: 'active',
      dataType: 'varchar',
      dataLength: 5,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  active?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {
      columnName: 'referral_message',
      dataType: 'varchar',
      dataLength: 500,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  referralMessage?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PatientReferral>) {
    super(data);
  }
}

export interface PatientReferralRelations {
  // describe navigational properties here
}

export type PatientReferralWithRelations = PatientReferral &
  PatientReferralRelations;
