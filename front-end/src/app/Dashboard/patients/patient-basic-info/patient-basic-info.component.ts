import { filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Patient } from "./patient";

@Component({
    selector: "app-patient-basic-info",
    templateUrl: "./patient-basic-info.component.html",
    styleUrls: ["./patient-basic-info.component.css"],
    providers: [MessageService],
})
export class PatientBasicInfoComponent implements OnInit {
    gender = [];
    editMode = false;
    patient: Patient = new Patient();
    items: MenuItem[];
    home: MenuItem;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
        router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                if (event.url === "/dashboard/editPatient") {
                    this.editMode = true;
                } else {
                    this.editMode = false;
                    this.items = [
                        { label: "Patients" },
                        { label: "Create Patient" },
                    ];
                }
            });
    }

    ngOnInit(): void {
        if (this.editMode === true) {
            localStorage.setItem("patientType", "update");
            let selected = localStorage.getItem("selectedPatient");
            let selectedPatient = JSON.parse(selected);
            this.patient.fileId = selectedPatient.id;
            this.patient.firstName = selectedPatient.username;
            this.items = [
                { label: "Patients" },
                { label: selectedPatient.username },
            ];
        } else {
            localStorage.setItem("patientType", "create");
        }
        this.gender = [{ name: "Male" }, { name: "Female" }];
        this.home = { icon: "fa fa-user-md" };
    }
    reset() {
        this.patient = new Patient();
    }
    save() {
        this.validatePatient((callback) => {
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
    validatePatient(callback) {
        if (!this.patient.fileId) {
            this.showMessage(
                "error",
                "Validation Error",
                "File id is required"
            );
            return false;
        }
        if (!this.patient.firstName) {
            this.showMessage(
                "error",
                "Validation Error",
                "First name is required"
            );
            return false;
        }
        if (!this.patient.middleName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Middle name is required"
            );
            return false;
        }
        if (!this.patient.lastName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Last Name is required"
            );
            return false;
        }
        if (!this.patient.email) {
            this.showMessage("error", "Validation Error", "email is required");
            return false;
        }
        if (!this.validateMail(this.patient.email)) {
            this.showMessage(
                "warn",
                "Invalid Mail",
                "email is not a valid mail"
            );
            return false;
        }
        if (!this.patient.phone) {
            this.showMessage("error", "Validation Error", "Phone is required");
            return false;
        }
        if (!this.patient.dateOfBirth) {
            this.showMessage(
                "error",
                "Validation Error",
                "Date of birth is required"
            );
            return false;
        }
        if (!this.patient.gender) {
            this.showMessage("error", "Validation Error", "Gender is required");
            return false;
        }
        if (!this.patient.country) {
            this.showMessage(
                "error",
                "Validation Error",
                "Country is required"
            );
            return false;
        }
        if (!this.patient.city) {
            this.showMessage("error", "Validation Error", "City is required");
            return false;
        }
        if (!this.patient.address) {
            this.showMessage(
                "error",
                "Validation Error",
                "Address is required"
            );
            return false;
        }
        if (!this.patient.bloodType) {
            this.showMessage(
                "error",
                "Validation Error",
                "Blood type is required"
            );
            return false;
        }
        if (!this.patient.emergencyContact) {
            this.showMessage(
                "error",
                "Validation Error",
                "Emergency contact is required"
            );
            return false;
        }
        if (!this.patient.emergencyPhone) {
            this.showMessage(
                "error",
                "Validation Error",
                "Emergency phone is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    validateMail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
