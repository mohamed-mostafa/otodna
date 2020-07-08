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
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label: this.selectedPatient.username
                    ? this.selectedPatient.username
                    : this.selectedPatient.firstName +
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
    save() {}
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
