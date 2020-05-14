import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent {
    constructor(public app: DashboardComponent, private router: Router) {}

    logout() {
        this.router.navigate(["login"]);
    }
}
