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
    events: any[];
    fullcalendarOptions: any;
    constructor(private router: Router) {}

    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
            },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
    addDiagnosis() {
        localStorage.setItem("sessionTypeId", JSON.stringify(0));
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addDiagnosis"]);
            });
    }
    addTreatment() {
        localStorage.setItem("sessionTypeId", JSON.stringify(1));
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addTreatment"]);
            });
    }
    addFollowup() {
        localStorage.setItem("sessionTypeId", JSON.stringify(2));
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addFollowup"]);
            });
    }
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
}
