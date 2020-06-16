import { AuthenticationService } from "./../Auth/auth.service";
import { MessageService } from "primeng/api";
import { UserService } from "./../user.service";
import { User } from "./../user";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { first } from "rxjs/operators";

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
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(["dashboard"]);
        }
    }

    ngOnInit(): void {}
    login() {
        this.validateUser((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.authenticationService
                    .login(this.user)
                    .pipe(first())
                    .subscribe(
                        (data) => {
                            this.spinner.hide();
                            this.router.navigate(["dashboard"]);
                        },
                        (err) => {
                            this.spinner.hide();
                            const { message, name } = err.error.error;

                            this.showMessage("error", name, message);
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
            life: 3000,
        });
    }
}
