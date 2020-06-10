import { InviteUser } from "./inviteUser";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { User } from "./user";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"],
    providers: [MessageService],
})
export class UsersComponent implements OnInit {
    cols: any[];
    users: any[];
    user: User = new User();
    inviteUser: InviteUser = new InviteUser();
    selectedUser;
    roles: any[];
    displayBasic: boolean;
    displayInviteUserDialog: boolean;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: "username", header: "Username" },
            { field: "email", header: "Email" },
        ];
        this.users = [
            { username: "Alaa Darwish", email: "alaa@gmail.com" },
            { username: "Ahmed Mahmoud", email: "ahmed@gmail.com" },
            { username: "Maha Ahmed", email: "maha@gmail.com" },
            { username: "Mohamed Mostafa", email: "mostafa@gmail.com" },
            { username: "Amr Hassan", email: "amr@gmail.com" },
            { username: "Aya Ali", email: "aya@gmail.com" },
            { username: "Mariem Mahmoud", email: "mariem@gmail.com" },
            { username: "Toka Ahmed", email: "toka@gmail.com" },
            { username: "Hatem Mohamed", email: "hatem@gmail.com" },
            { username: "Eslam Ashref", email: "elslam@gmail.com" },
            { username: "Omnia Mohamed", email: "omnia@gmail.com" },
            { username: "Yones Salah", email: "yones@gmail.com" },
        ];
        this.roles = [
            { name: "Consultant" },
            { name: "Doctor" },
            { name: "Nurse" },
            { name: "Admin" },
        ];
    }
    editUser(selected) {
        this.user = selected;
        this.displayBasic = true;
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.displayBasic = false;
            this.user = new User();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
    }
    cancel() {
        this.displayBasic = false;
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 1000,
        });
    }
    showInviteUserDialog() {
        this.displayInviteUserDialog = true;
    }
    saveInviteUserDialog() {
        this.validateInviteUserDialog((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.displayInviteUserDialog = false;
                    this.inviteUser = new InviteUser();
                    this.showMessage(
                        "success",
                        "Saved",
                        "Invitation sent successfully"
                    );
                    this.spinner.hide();
                }, 2000);
            } else {
                this.showMessage("warn", "Error", "Please try again");
            }
        });
    }
    validateInviteUserDialog(callback) {
        if (!this.inviteUser.fullName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Full name is required"
            );
            return false;
        }
        if (!this.inviteUser.email) {
            this.showMessage("error", "Validation Error", "Email is required");
            return false;
        }
        if (!this.validateMail(this.inviteUser.email)) {
            this.showMessage(
                "warn",
                "Invalid Mail",
                "email is not a valid mail"
            );
            return false;
        }
        if (!this.inviteUser.role) {
            this.showMessage("error", "Validation Error", "Role is required");
            return false;
        } else {
            callback("valid");
        }
    }
    validateMail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
