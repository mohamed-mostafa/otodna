import { UserService } from "./../user.service";
import { User } from "./../user";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    providers: [MessageService],
})
export class RegisterComponent implements OnInit {
    confirmPassword;
    user: User = new User();
    roles = [];
    constructor(
        private router: Router,
        private ngZone: NgZone,
        private userService: UserService,
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.user.role_id = "Select Role";
        this.getAllRoles();
    }
    register() {
        this.validateUser((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.user.active = true;
                this.user.approved = false;
                this.userService.register(this.user).subscribe(
                    (result) => {
                        this.user = new User();
                        this.spinner.hide();
                        this.ngZone.run(() => {
                            this.router.navigate(["successfullyRegistered"]);
                        });
                    },
                    (err) => {
                        const { message, code, statusCode } = err.error.error;
                        if (code === "ER_DUP_ENTRY" && statusCode === "422") {
                            this.spinner.hide();
                            this.showMessage(
                                "warn",
                                "Duplicated!",
                                "Username already saved in DB"
                            );
                        } else {
                            this.spinner.hide();
                            this.showMessage(
                                "error",
                                "Error!",
                                "Please try again"
                            );
                        }
                    }
                );
            } else {
                this.showMessage("warn", "Error", "Please try again");
            }
        });
    }
    goToLogin() {
        this.router.navigate(["login"]);
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    validateUser(callback) {
        if (!this.user.fullName) {
            this.showMessage(
                "error",
                "Validation Error",
                "FullName is required"
            );
            return false;
        }
        if (!this.user.username) {
            this.showMessage(
                "error",
                "Validation Error",
                "Username is required"
            );
            return false;
        }
        if (!this.user.emailAddress) {
            this.showMessage("error", "Validation Error", "Email is required");
            return false;
        }
        if (!this.validateMail(this.user.emailAddress)) {
            this.showMessage(
                "warn",
                "Invalid Mail",
                "email is not a valid mail"
            );
            return false;
        }
        if (!this.user.password) {
            this.showMessage(
                "error",
                "Validation Error",
                "Password is required"
            );
            return false;
        }
        if (this.user.password.length < 8) {
            this.showMessage(
                "warn",
                "Validation Error",
                "password must be minimum 8 characters"
            );
            return false;
        }
        if (!this.confirmPassword) {
            this.showMessage(
                "error",
                "Validation Error",
                "Confirm Password is required"
            );
            return false;
        }
        if (this.user.password !== this.confirmPassword) {
            this.showMessage(
                "warn",
                "Not Equal",
                "Password And Confirm Password is not equal"
            );
            return false;
        }
        if (!this.user.role_id || this.user.role_id === "Select Role") {
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
    getAllRoles() {
        this.spinner.show();
        this.userService.getAllRoles().subscribe((result) => {
            this.roles = result;
            this.spinner.hide();
        });
    }
}
