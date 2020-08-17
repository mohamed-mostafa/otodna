import { SymptomsService } from "./../services/symptoms.service";
import { MenuItem } from "primeng/primeng";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Symptom } from "./symptom";

@Component({
    selector: "app-symptoms",
    templateUrl: "./symptoms.component.html",
    styleUrls: ["./symptoms.component.css"],
    providers: [MessageService],
})
export class SymptomsComponent implements OnInit {
    selectedPatient;
    symptom: Symptom = new Symptom();
    selectedSymptoms;
    items: MenuItem[];
    home: MenuItem;
    symptoms = [];
    patientSessionSymptoms = [];
    selectedSession;
    showButtons = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private symptomsService: SymptomsService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.symptom.patientSessionId = this.selectedSession.id;
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
                command: (event) => {
                    this.goToPatientPage(event);
                },
            },
            { label: this.selectedSession.displayName },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.getALlSymptoms();
        this.getPatientSessionSymptoms();
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
    getALlSymptoms() {
        this.spinner.show();
        this.symptomsService.getAllSymptoms().subscribe(async (result) => {
            this.symptoms = result;
            this.spinner.hide();
        });
    }
    save() {
        if (!this.selectedSymptoms || this.selectedSymptoms.length < 1) {
            this.showMessage(
                "error",
                "Validation Error",
                "Please select at least one symptom"
            );
            return false;
        }
        const symptomsArray = [];
        this.selectedSymptoms.forEach((sys) => {
            let obj = {
                patientSessionId: this.symptom.patientSessionId,
                symptomId: sys,
                ear: "L",
            };
            symptomsArray.push(obj);
        });
        this.symptomsService
            .createSymptoms(symptomsArray)
            .subscribe((u: any) => {
                this.showButtons = false;
                this.spinner.hide();
                this.showMessage("success", "Saved", "Data saved successfully");
            });
    }
    update() {
        if (!this.selectedSymptoms || this.selectedSymptoms.length < 1) {
            this.showMessage(
                "error",
                "Validation Error",
                "Please select at least one symptom"
            );
            return false;
        }
        const symptomsArray = [];
        this.selectedSymptoms.forEach((sys) => {
            let obj = {
                patientSessionId: this.symptom.patientSessionId,
                symptomId: sys,
                ear: "L",
            };
            symptomsArray.push(obj);
        });
        this.symptomsService
            .updateSymptoms(this.symptom.patientSessionId, symptomsArray)
            .subscribe((u: any) => {
                this.spinner.hide();
                this.showMessage(
                    "success",
                    "Saved",
                    "Data updated successfully"
                );
            });
    }
    back() {
        this.goToPatientPage("a");
    }
    reset() {
        this.selectedSymptoms = "";
        this.goToPatientPage("a");
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    goToPatientPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
    }
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
    getPatientSessionSymptoms() {
        this.spinner.show();
        this.symptomsService
            .getPatientSessionSymptoms(this.selectedSession.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    result.forEach((element) => {
                        this.patientSessionSymptoms.push(element.symptomId);
                    });
                    this.selectedSymptoms = [
                        ...new Set(this.patientSessionSymptoms),
                    ];
                    this.showButtons = false;
                }
                this.spinner.hide();
            });
    }
}
