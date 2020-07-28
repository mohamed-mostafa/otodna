import { AuthenticationService } from "./../Auth/auth.service";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
    styleUrls: ["./app.topbar.component.css"],
})
export class AppTopBarComponent {
    fullName;
    job;
    constructor(
        public app: DashboardComponent,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        if (localStorage.getItem("user") === null) {
            this.router.navigate(["login"]);
        } else {
            let selectedUser = JSON.parse(localStorage.getItem("user"));
            this.fullName = selectedUser.fullName;
            this.job =
                selectedUser.role.name === "None"
                    ? selectedUser.type.name
                    : selectedUser.role.name;
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(["login"]);
    }
}
