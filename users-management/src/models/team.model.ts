import {Entity, model, property, hasMany} from '@loopback/repository';
import {TeamMember} from './team-member.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-users', table: 'team'},
  },
})
export class Team extends Entity {
  @property({
    type: 'boolean',
    required: true,
    length: 1,
    mysql: {
      columnName: 'active',
      dataType: 'char',
      dataLength: 1,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  active: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'department_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  departmentId: number;

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
      columnName: 'name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'owner_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  ownerId: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'creationDate',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  creationDate: string;

  @hasMany(() => TeamMember)
  teamMembers: TeamMember[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
