import {Model, model, property} from '@loopback/repository';
import {UserProfile, securityId} from '@loopback/security';
import { UserType, Team } from '.';
import { Role } from './role.model';

@model({settings: {strict: false}})
export class LoggedInUser implements UserProfile {
  
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: false,
  })
  id?: number

  [securityId]: string;

  @property({
    type: 'string',
    required: true,
  })
  email?: string | undefined;
  @property({
    type: 'string',
    required: true,
  })
  name?: string | undefined;
  @property({
    type: 'string',
    required: true,
  })
  fullName?: string;

  @property({
    type: 'string',
    required: true,
  })
  token?: string;

  @property({
    type: "Object"
  })
  role?: Role;

  @property({
    type: "Object"
  })
  type?: UserType;

  @property.array(Team)
  teams?: Team[];
  
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LoggedInUser>) {

  }
 
}

export interface LoggedInUserRelations {
  // describe navigational properties here
}

export type LoggedInUserWithRelations = LoggedInUser & LoggedInUserRelations;
