import { MessageService } from "primeng/api";
import { UserService } from "./../user.service";
import { User } from "./../user";
import { Router } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    username;
    password;
    user: User = new User();
    constructor(
        private router: Router,
        private ngZone: NgZone,
        private userService: UserService,
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {}
    login() {
        this.validateUser((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.userService.login(this.user).subscribe(
                    (result) => {
                        console.log(result);

                        if (result) {
                            localStorage.setItem(
                                "user",
                                JSON.stringify(result)
                            );
                            this.spinner.hide();
                            this.ngZone.run(() => {
                                this.router.navigate(["dashboard"]);
                            });
                        }
                    },
                    (err) => {
                        this.spinner.hide();
                        this.showMessage(
                            "error",
                            "UnAuthorized!",
                            "Incorrect username or password."
                        );
                    }
                );
            } else {
                this.showMessage("warn", "Error", "Please try again");
            }
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
        if (!this.user.password) {
            this.showMessage(
                "error",
                "Validation Error",
                "Password is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    register() {
        this.ngZone.run(() => {
            this.router.navigate(["register"]);
        });
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 1000,
        });
    }
}
