import {Entity, model, property} from '@loopback/repository';

@model()
export class PatientSearch extends Entity {
  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  mobile?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  patientNumber?: string;

  @property({
    type: 'date',
  })
  dateOfBirth?: string;

  constructor(data?: Partial<PatientSearch>) {
    super(data);
  }
}

export interface PatientSearchRelations {
  // describe navigational properties here
}

export type PatientSearchWithRelations = PatientSearch & PatientSearchRelations;
