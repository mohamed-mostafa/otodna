import { Router } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import swal from "sweetalert";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    username;
    password;
    constructor(
        private router: Router,
        private ngZone: NgZone,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {}
    login() {
        if (this.username === "Admin" && this.password === "Admin") {
            this.spinner.show();
            setTimeout(() => {
                this.spinner.hide();
                localStorage.setItem("username", this.username);
                this.ngZone.run(() => {
                    this.router.navigate(["dashboard"]);
                });
            }, 2000);
        } else {
            this.callSwal("UnAuthorized!", "You are not authorized.", "error");
        }
    }

    callSwal(title, text, icon) {
        return swal({ title, text, icon, timer: 1000, buttons: [false] });
    }
}
