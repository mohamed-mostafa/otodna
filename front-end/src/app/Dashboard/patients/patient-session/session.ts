export class Session {
    displayName: string;
    date: Date;
    createdBy: string;
    createdAt: Date;
    sessionTypeId: number;
    performer: string;
    notes: string;
    symptoms: [];
    patientId: number;
    departmentId: number;
    ended: string;
    patientSessionPathologies: any;
    sessionTests: any;
    sessionTreatments: any;
}
