import { PatientCountryService } from "../services/countryService";
import { Router } from "@angular/router";
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
    filteredCountries: any[];
    hideDiscard = false;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private countryService: PatientCountryService
    ) {}

    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        if (selectedPatient) {
            this.patient.fileId = selectedPatient.id
                ? selectedPatient.id
                : selectedPatient.fileId;
            this.patient.firstName = selectedPatient.username
                ? selectedPatient.username
                : selectedPatient.firstName;
            this.items = [
                { label: "Patients" },
                {
                    label: selectedPatient.username
                        ? selectedPatient.username
                        : selectedPatient.firstName +
                          " " +
                          selectedPatient.lastName,
                },
            ];
            this.hideDiscard = true;
        } else {
            this.items = [{ label: "Patients" }, { label: "Create Patient" }];
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
                localStorage.setItem(
                    "selectedPatient",
                    JSON.stringify(this.patient)
                );
                this.router
                    .navigateByUrl("/RefreshComponent", {
                        skipLocationChange: true,
                    })
                    .then(() => {
                        this.router.navigate(["/dashboard/patient"]);
                    });
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
            life: 3000,
        });
    }
    validatePatient(callback) {
        if (!this.patient.firstName) {
            this.showMessage(
                "error",
                "Validation Error",
                "First name is required"
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
        } else {
            callback("valid");
        }
    }
    addDiagnosis() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addDiagnosis"]);
            });
    }
    addTreatment() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addTreatment"]);
            });
    }
    addFollowup() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addFollowup"]);
            });
    }
    filterCountry(event) {
        const query = event.query;
        this.countryService.getCountries().then((countries) => {
            this.filteredCountries = this.searchCountry(query, countries);
        });
    }
    searchCountry(query, countries: any[]): any[] {
        // in a real application, make a request to a remote url with the query and return filtered results,
        // for demo we filter at client side
        const filtered: any[] = [];
        for (const item of countries) {
            const country = item;
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }
}
