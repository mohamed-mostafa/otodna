import { MessageService } from "primeng/api";
import { User } from "./user";
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
    user: User = new User();
    role = [];
    constructor(
        private router: Router,
        private ngZone: NgZone,
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.user.role = "Select Role";
        this.role = [
            { name: "Consultant" },
            { name: "Admin" },
            { name: "Doctor" },
        ];
    }
    register() {
        this.validateUser((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.spinner.hide();
                    this.user = new User();
                    this.ngZone.run(() => {
                        this.router.navigate(["login"]);
                    });
                }, 2000);
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
            life: 1000,
        });
    }
    validateUser(callback) {
        if (!this.user.username) {
            this.showMessage(
                "error",
                "Validation Error",
                "Username is required"
            );
            return false;
        }
        if (!this.user.email) {
            this.showMessage("error", "Validation Error", "Email is required");
            return false;
        }
        if (!this.validateMail(this.user.email)) {
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
        if (!this.user.confirmPassword) {
            this.showMessage(
                "error",
                "Validation Error",
                "Confirm Password is required"
            );
            return false;
        }
        if (this.user.password !== this.user.confirmPassword) {
            this.showMessage(
                "warn",
                "Not Equal",
                "Password And Confirm Password is not equal"
            );
            return false;
        }
        if (!this.user.role || this.user.role === "Select Role") {
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
