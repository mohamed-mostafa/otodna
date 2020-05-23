import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-patient-history",
    templateUrl: "./patient-history.component.html",
    styleUrls: ["./patient-history.component.css"],
})
export class PatientHistoryComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.items = [{ label: "Patients" }, { label: "Create Patient" }];
        this.home = { icon: "fa fa-user-md" };
    }
    addDiagnosis() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addDiagnosis"]);
            });
    }
    addTreatment() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addTreatment"]);
            });
    }
    addFollowup() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addFollowup"]);
            });
    }
}
