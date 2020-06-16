import { InviteUser } from "./inviteUser";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { PublicServiceService } from "../public-service.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"],
    providers: [MessageService, ConfirmationService],
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
        private confirmationService: ConfirmationService,
        private publicService: PublicServiceService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: "username", header: "Username" },
            { field: "fullName", header: "Full Name" },
            { field: "email", header: "Email" },
            { field: "status", header: "Status" },
        ];

        this.roles = [
            { name: "Consultant" },
            { name: "Doctor" },
            { name: "Nurse" },
            { name: "Admin" },
        ];
        this.getAllUsers();
    }
    getAllUsers() {
        this.spinner.show();
        this.publicService.getAllData("users").subscribe((result) => {
            this.users = result;
            this.spinner.hide();
        });
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
            life: 3000,
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
    approveUser(selected) {
        this.confirmationService.confirm({
            message: "Do you want to approve this user?",
            header: "Approve Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                selected.status = "Active";
                this.showMessage("success", "Confirmed", "User Approvved");
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    rejectUser(selected) {
        this.confirmationService.confirm({
            message: "Do you want to reject this user?",
            header: "Rejection Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.users = this.users.filter((item) => item !== selected);
                this.showMessage("success", "Confirmed", "User Rejected");
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    activateUser(selected) {
        this.confirmationService.confirm({
            message: "Do you want to activate this user?",
            header: "Activation Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                selected.status = "Active";
                this.showMessage("success", "Confirmed", "User Activated");
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    deActivateUser(selected) {
        this.confirmationService.confirm({
            message: "Do you want to deActivate this user?",
            header: "DeActivation Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                selected.status = "Inactive";
                this.showMessage("success", "Confirmed", "User deActivated");
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
}
