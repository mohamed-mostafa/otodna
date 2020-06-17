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
    role;
    userTypes: any[];
    userType;
    displayBasic: boolean;
    displayInviteUserDialog: boolean;
    apiLink = "users";
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
        this.getAllRoles();
        this.getAllUserTypes();
        this.getAllUsers();
    }
    getAllUsers() {
        this.spinner.show();
        this.publicService.getAllData(this.apiLink).subscribe((result) => {
            this.users = result;
            this.spinner.hide();
        });
    }
    checkStatus(selected) {
        if (selected.approved === true && selected.active === true) {
            return "Active";
        } else if (selected.approved === true && selected.active === false) {
            return "Inactive";
        } else {
            return "Pending";
        }
    }
    editUser(selected) {
        this.user = selected;
        this.role = this.roles.find(function (r) {
            return r.id === selected.role_id;
        });
        this.userType = this.userTypes.find(function (type) {
            return type.id === selected.user_type_id;
        });
        this.user.status = this.checkStatus(selected);
        this.displayBasic = true;
    }
    saveEditUser() {
        if (!this.role) {
            this.showMessage("error", "Validation Error", "Role is required");
            return false;
        }
        if (!this.userType) {
            this.showMessage(
                "error",
                "Validation Error",
                "User Type is required"
            );
            return false;
        }
        this.user.role_id = this.role.id;
        this.user.user_type_id = this.userType.id;
        delete this.user.status;
        this.publicService
            .updateData(this.user, this.apiLink)
            .subscribe((c) => {
                this.spinner.hide();
                this.getAllUsers();
                this.displayBasic = false;
            });
        this.showMessage("success", "Confirmed", "User Updated Successfully");
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
                this.spinner.show();
                selected.approved = true;
                this.publicService
                    .updateData(selected, this.apiLink)
                    .subscribe((c) => {
                        this.spinner.hide();
                        this.getAllUsers();
                    });
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
                this.spinner.show();
                this.publicService
                    .deleteData(selected.id, this.apiLink)
                    .subscribe(() => {
                        this.spinner.hide();
                        this.getAllUsers();
                    });
                this.getAllUsers();
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
                this.spinner.show();
                selected.active = true;
                this.publicService
                    .updateData(selected, this.apiLink)
                    .subscribe((c) => {
                        this.spinner.hide();
                        this.getAllUsers();
                    });
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
                this.spinner.show();
                selected.active = false;
                this.publicService
                    .updateData(selected, this.apiLink)
                    .subscribe((c) => {
                        this.spinner.hide();
                        this.getAllUsers();
                    });
                this.showMessage("success", "Confirmed", "User deActivated");
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    getAllRoles() {
        this.spinner.show();
        this.publicService.getAllData("roles").subscribe((result) => {
            this.roles = result;
            this.spinner.hide();
        });
    }
    getAllUserTypes() {
        this.spinner.show();
        this.publicService.getAllData("user-types").subscribe((result) => {
            this.userTypes = result;
            this.spinner.hide();
        });
    }
}
