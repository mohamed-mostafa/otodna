import { NgxSpinnerService } from "ngx-spinner";
import { PatientSessionService } from "./../services/patient-session.service";
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
    selectedPatient;
    allData = [];
    showAllButtons = true;
    constructor(
        private router: Router,
        private patientSession: PatientSessionService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
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
                label:
                    this.selectedPatient.firstName +
                    " " +
                    this.selectedPatient.lastName,
            },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.getAllData();
        this.checkLoggedInUserTeamWithPatient();
    }
    checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        if (LoggedInUser.teams.length > 0) {
            const found = LoggedInUser.teams.some(
                (team) => team.id === this.selectedPatient.teamId
            );
            if (found) {
                this.showAllButtons = true;
            } else {
                this.showAllButtons = false;
            }
        }
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
    getAllData() {
        this.spinner.show();
        this.patientSession
            .getAllSessions(this.selectedPatient.id)
            .subscribe(async (result) => {
                this.allData = result;
                this.allData.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                this.spinner.hide();
            });
    }
    openDataPage(data) {
        localStorage.setItem("sessionBasicInfo", JSON.stringify(data));
        if (data.sessionTypeId === 0) {
            this.addDiagnosis();
        } else if (data.sessionTypeId === 1) {
            this.addTreatment();
        } else {
            this.addFollowup();
        }
    }
}
