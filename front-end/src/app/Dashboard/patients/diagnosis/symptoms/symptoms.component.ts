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
        let selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.symptom.patientSessionId = selectedSession.id;
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
            { label: "Symptoms" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.getALlSymptoms();
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
                this.spinner.hide();
                this.reset();
                this.selectedSymptoms = [];
                this.showMessage("success", "Saved", "Data saved successfully");
            });
    }
    reset() {}
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
}
