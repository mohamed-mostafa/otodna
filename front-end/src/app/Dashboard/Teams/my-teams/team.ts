export class Team {
    active: boolean;
    name: string;
    owner: string;
    ownerId: string;
    department: any;
    department_id: string;
    creationDate: Date;
    constructor() {
        this.active = true;
        this.creationDate = new Date();
    }
}
