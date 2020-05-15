import { Router } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import swal from "sweetalert";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    username;
    password;
    constructor(private router: Router, private ngZone: NgZone) {}

    ngOnInit(): void {}
    login() {
        if (this.username === "Admin" && this.password === "Admin") {
            localStorage.setItem("username", this.username);
            this.ngZone.run(() => {
                this.router.navigate(["dashboard"]);
            });
        } else {
            this.callSwal("UnAuthorized!", "You are not authorized.", "error");
        }
    }

    callSwal(title, text, icon) {
        return swal({ title, text, icon, timer: 1000, buttons: [false] });
    }
}
