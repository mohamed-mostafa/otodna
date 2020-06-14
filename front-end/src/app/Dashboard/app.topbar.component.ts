import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent {
    username;
    constructor(public app: DashboardComponent, private router: Router) {
        if (localStorage.getItem("user") === null) {
            this.router.navigate(["login"]);
        } else {
            let selectedUser = JSON.parse(localStorage.getItem("user"));
            this.username = selectedUser.name;
        }
    }

    logout() {
        localStorage.removeItem("user");
        this.router.navigate(["login"]);
    }
}
