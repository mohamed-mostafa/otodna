import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'patient_family_member'},
  },
})
export class PatientFamilyMember extends Entity {
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
      columnName: 'family_member_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  familyMemberName: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'family_member_relation_type_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  familyMemberRelationTypeId: number;

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

  constructor(data?: Partial<PatientFamilyMember>) {
    super(data);
  }
}

export interface PatientFamilyMemberRelations {
  // describe navigational properties here
}

export type PatientFamilyMemberWithRelations = PatientFamilyMember &
  PatientFamilyMemberRelations;
