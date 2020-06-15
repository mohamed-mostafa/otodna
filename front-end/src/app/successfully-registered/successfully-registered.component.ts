import { Router } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";

@Component({
    selector: "app-successfully-registered",
    templateUrl: "./successfully-registered.component.html",
    styleUrls: ["./successfully-registered.component.scss"],
})
export class SuccessfullyRegisteredComponent implements OnInit {
    constructor(private router: Router, private ngZone: NgZone) {}

    ngOnInit(): void {}
    goToLogin() {
        this.ngZone.run(() => {
            this.router.navigate(["login"]);
        });
    }
}
