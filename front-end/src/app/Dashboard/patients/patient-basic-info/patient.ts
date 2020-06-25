export class Patient {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobile: number;
    dateOfBirth: Date;
    gender: string;
    country: string;
    city: string;
    address: string;
    teamId: number;
    createdBy: string;
    createdAt: Date;
    lastModifiedBy: string;
    lastModifiedAt: Date;
    bloodType: string;
    emergencyContact: number;
    emergencyPhone: number;
    constructor() {
        this.createdAt = new Date();
        this.lastModifiedAt = new Date();
    }
}
