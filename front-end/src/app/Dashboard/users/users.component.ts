import { InviteUser } from "./inviteUser";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { User } from "./user";

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
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: "username", header: "Username" },
            { field: "fullName", header: "Full Name" },
            { field: "email", header: "Email" },
            { field: "status", header: "Status" },
        ];
        this.users = [
            {
                username: "Alaa Darwish",
                fullName: "Alaa El Dain Darwish",
                status: "Active",
                email: "alaa@gmail.com",
            },
            {
                username: "Ahmed Mahmoud",
                fullName: "Ahmed Abdallah Mahmoud",
                status: "Inactive",
                email: "ahmed@gmail.com",
            },
            {
                username: "Maha Ahmed",
                fullName: "Maha Sobhy Ahmed",
                status: "Pending",
                email: "maha@gmail.com",
            },
            {
                username: "Mohamed Mostafa",
                fullName: "Mohamed Mostafa Mahmoud",
                status: "Active",
                email: "mostafa@gmail.com",
            },
            {
                username: "Amr Hassan",
                fullName: "Amr Hassan Ali",
                status: "Inactive",
                email: "amr@gmail.com",
            },
            {
                username: "Aya Ali",
                fullName: "Aya Ahmed Ali",
                status: "Pending",
                email: "aya@gmail.com",
            },
            {
                username: "Mariem Mahmoud",
                fullName: "Mariem Mahmoud Mohamed",
                status: "Inactive",
                email: "mariem@gmail.com",
            },
            {
                username: "Toka Ahmed",
                fullName: "Toka Ahmed Ali",
                status: "Active",
                email: "toka@gmail.com",
            },
            {
                username: "Hatem Mohamed",
                fullName: "Hatem Mohamed Alaa",
                status: "Active",
                email: "hatem@gmail.com",
            },
            {
                username: "Eslam Ashref",
                fullName: "Eslam Ashref Salah",
                status: "Pending",
                email: "elslam@gmail.com",
            },
            {
                username: "Omnia Mohamed",
                fullName: "Omina Ahmed Moahmed",
                status: "Pending",
                email: "omnia@gmail.com",
            },
            {
                username: "Yones Salah",
                fullName: "Yones Salah Zaki",
                status: "Inactive",
                email: "yones@gmail.com",
            },
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
