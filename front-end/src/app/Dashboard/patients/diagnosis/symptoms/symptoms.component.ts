import { SymptomsService } from "./../services/symptoms.service";
import { MenuItem } from "primeng/primeng";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Symptom } from "./symptom";
import { SharedClass } from "../../shared/sharedFunctions";
import { ShowMessageComponent } from "../../../shared/show-message/show-message.component";
@Component({
    selector: "app-symptoms",
    templateUrl: "./symptoms.component.html",
    styleUrls: ["./symptoms.component.css"],
    providers: [MessageService],
})
export class SymptomsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
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
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient.teamId
        );
    }
    getALlSymptoms() {
        this.spinner.show();
        this.symptomsService.getAllSymptoms().then((result) => {
            this.symptoms = result;
            this.spinner.hide();
        });
    }
    save() {
        if (!this.selectedSymptoms || this.selectedSymptoms.length < 1) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Please select at least one symptom"
            );
            return false;
        }
        const symptomsArray = [];
        this.selectedSymptoms.forEach((sys) => {
            let obj;
            if (sys.startsWith("right")) {
                // const newSymptom = sys.replace("right-", "");
                obj = {
                    patientSessionId: this.symptom.patientSessionId,
                    symptomId: sys,
                    ear: "R",
                };
            } else if (sys.startsWith("left")) {
                // const newSymptom = sys.replace("left-", "");
                obj = {
                    patientSessionId: this.symptom.patientSessionId,
                    symptomId: sys,
                    ear: "L",
                };
            } else {
                obj = {
                    patientSessionId: this.symptom.patientSessionId,
                    symptomId: sys,
                    ear: "BOTH",
                };
            }
            symptomsArray.push(obj);
        });
        this.symptomsService
            .createSymptoms(symptomsArray)
            .subscribe((u: any) => {
                this.showButtons = false;
                this.spinner.hide();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
            });
    }
    update() {
        if (!this.selectedSymptoms || this.selectedSymptoms.length < 1) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Please select at least one symptom"
            );
            return false;
        }
        const symptomsArray = [];
        this.selectedSymptoms.forEach((sys) => {
            let obj;
            if (sys.startsWith("right")) {
                // const newSymptom = sys.replace("right-", "");
                obj = {
                    patientSessionId: this.symptom.patientSessionId,
                    symptomId: sys,
                    ear: "R",
                };
            } else if (sys.startsWith("left")) {
                // const newSymptom = sys.replace("left-", "");
                obj = {
                    patientSessionId: this.symptom.patientSessionId,
                    symptomId: sys,
                    ear: "L",
                };
            } else {
                obj = {
                    patientSessionId: this.symptom.patientSessionId,
                    symptomId: sys,
                    ear: "BOTH",
                };
            }
            symptomsArray.push(obj);
        });
        this.symptomsService
            .updateSymptoms(this.symptom.patientSessionId, symptomsArray)
            .subscribe((u: any) => {
                this.spinner.hide();
                this.showMessageComponent.showMessage(
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
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
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
    endSession() {
        this.sharedClass.endSession(this.router.url, this.router);
    }
}
