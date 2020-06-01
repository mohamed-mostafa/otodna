import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Diagnosis } from "./diagnosis";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

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

    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            { label: "Patients" },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
            },
            { label: "Diagnosis" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
    }
    reset() {
        this.diagnosis = new Diagnosis();
    }
    save() {
        this.validateDiagnosis((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.spinner.hide();
                    this.reset();
                    this.showMessage(
                        "success",
                        "Saved",
                        "Data saved successfully"
                    );
                }, 2000);
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
            life: 1000,
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
        if (!this.diagnosis.sessionTypeId) {
            this.showMessage(
                "error",
                "Validation Error",
                "Session Type is required"
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
        }
        if (!this.diagnosis.notes) {
            this.showMessage("error", "Validation Error", "Notes is required");
            return false;
        }
        if (!this.diagnosis.symptomName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Symptom Name is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
}
