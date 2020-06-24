import {Entity, model, property, hasOne} from '@loopback/repository';
import {PatientMedicalInfo} from './patient-medical-info.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'patient'},
  },
})
export class Patient extends Entity {
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
      columnName: 'first_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  firstName: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'middle_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'last_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  lastName: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'mobile',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  mobile: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'date_of_birth',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  dateOfBirth: string;

  @property({
    type: 'string',
    required: true,
    length: 1,
    mysql: {
      columnName: 'gender',
      dataType: 'char',
      dataLength: 1,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  gender: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'country',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  country?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'city',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  city?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'address',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  address?: string;

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
    required: true,
    length: 45,
    mysql: {
      columnName: 'created_by',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  createdBy: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'created_at',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'last_modified_by',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  lastModifiedBy: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'last_modified_at',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  lastModifiedAt: string;

  @hasOne(() => PatientMedicalInfo)
  patientMedicalInfo: PatientMedicalInfo;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}

export interface PatientRelations {
  // describe navigational properties here
}

export type PatientWithRelations = Patient & PatientRelations;
