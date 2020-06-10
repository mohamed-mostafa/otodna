import {Entity, model, property, hasOne, belongsTo, hasMany} from '@loopback/repository';
import {Role} from './role.model';
import {UserType} from './user-type.model';
import {TeamMember} from './team-member.model';

@model({settings: {
  idInjection: false, mysql: {schema: 'otodna-users', table: 'user'},
  // scope: {
  //   include: ["userType", "role"]
  // },
  hiddenProperties: ['password']
}})
export class User extends Entity {
  @property({
    type: 'boolean',
    required: true,
    length: 1,
    mysql: {columnName: 'active', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  active: boolean;

  @property({
    type: 'boolean',
    required: true,
    length: 1,
    mysql: {columnName: 'approved', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  approved: boolean;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'email_address', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  emailAddress: string;

  @property({
    type: 'string',
    required: true,
    length: 90,
    mysql: {columnName: 'full_name', dataType: 'varchar', dataLength: 90, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  fullName: string;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 256,
    mysql: {columnName: 'password', dataType: 'varchar', dataLength: 256, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  password: string;
  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'username', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  username: string;

  @belongsTo(() => Role, {name: "role", keyFrom: "role_id", keyTo: "id"})
  role_id: number;

  @belongsTo(() => UserType, {name: "userType", keyFrom: "user_type_id", keyTo: "id"})
  user_type_id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
