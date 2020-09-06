import { NgxSpinnerService } from "ngx-spinner";
import { PatientSessionService } from "./../services/patient-session.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../shared/sharedFunctions";
@Component({
    selector: "app-patient-history",
    templateUrl: "./patient-history.component.html",
    styleUrls: ["./patient-history.component.css"],
})
export class PatientHistoryComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
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
        this.getAllData();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient.teamId
        );
    }
    addDiagnosis() {
        this.sharedClass.goToAddDiagnosis(this.router);
    }
    addTreatment() {
        this.sharedClass.goToAddTreatment(this.router);
    }
    addFollowup() {
        this.sharedClass.goToAddFollowup(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
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
