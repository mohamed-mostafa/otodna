import {Model, model, property} from '@loopback/repository';
import { Patient } from './patient.model';
import { PatientMedicalInfo } from './patient-medical-info.model';

@model()
export class PatientAndMedicalInfo extends Model {
  @property({
    type: 'object',
    required: true,
  })
  patient: Patient;

  @property({
    type: 'object',
  })
  patientMedicalInfo?: PatientMedicalInfo;


  constructor(data?: Partial<PatientAndMedicalInfo>) {
    super(data);
  }
}

export interface PatientAndMedicalInfoRelations {
  // describe navigational properties here
}

export type CreatePatientWithMedicalInfoRequestWithRelations = PatientAndMedicalInfo & PatientAndMedicalInfoRelations;
