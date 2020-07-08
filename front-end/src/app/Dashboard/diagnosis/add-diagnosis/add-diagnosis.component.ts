import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Diagnosis } from "./diagnosis";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { AddDiagnosisService } from "../services/add-diagnosis.service";

@Component({
    selector: "app-add-diagnosis",
    templateUrl: "./add-diagnosis.component.html",
    styleUrls: ["./add-diagnosis.component.css"],
    providers: [MessageService],
})
export class AddDiagnosisComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    diagnosis: Diagnosis = new Diagnosis();
    selectedPatient;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private addDiagnosisService: AddDiagnosisService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.diagnosis.sessionTypeId = 0;
        this.diagnosis.patientId = this.selectedPatient.id;
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
            { label: "Diagnosis" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.loadData();
    }
    loadData() {
        this.diagnosis.date = new Date();
        this.diagnosis.createdAt = new Date();
        this.diagnosis.createdBy =
            this.selectedPatient.firstName +
            " " +
            this.selectedPatient.lastName;
        this.diagnosis.performer =
            this.selectedPatient.firstName +
            " " +
            this.selectedPatient.lastName;
    }
    reset() {
        this.diagnosis = new Diagnosis();
    }
    save() {
        this.validateDiagnosis((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.addDiagnosisService
                    .createDiagnosis(this.diagnosis)
                    .subscribe((u: any) => {
                        this.spinner.hide();
                        localStorage.setItem(
                            "diagnosisBasicInfo",
                            JSON.stringify(this.diagnosis)
                        );
                        this.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessage("warn", "Error", "Please try again");
            }
        });
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    validateDiagnosis(callback) {
        if (!this.diagnosis.displayName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Display Name is required"
            );
            return false;
        }
        if (!this.diagnosis.date) {
            this.showMessage("error", "Validation Error", "Date is required");
            return false;
        }
        if (!this.diagnosis.createdBy) {
            this.showMessage(
                "error",
                "Validation Error",
                "Created By is required"
            );
            return false;
        }
        if (!this.diagnosis.createdAt) {
            this.showMessage(
                "error",
                "Validation Error",
                "Created At is required"
            );
            return false;
        }
        if (!this.diagnosis.performer) {
            this.showMessage(
                "error",
                "Validation Error",
                "Performer is required"
            );
            return false;
        } else {
            callback("valid");
        }
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
