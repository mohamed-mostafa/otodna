export class User {
    fullName: string;
    username: string;
    emailAddress: string;
    password: string;
    role_id: string;
    active: boolean;
    approved: boolean;
    constructor() {
        this.active = true;
        this.approved = false;
    }
}
