export class Team {
    active: boolean;
    name: string;
    owner: string;
    ownerId: string;
    department: any;
    departmentId: string;
    creationDate: Date;
    constructor() {
        this.active = true;
        this.creationDate = new Date();
    }
}
