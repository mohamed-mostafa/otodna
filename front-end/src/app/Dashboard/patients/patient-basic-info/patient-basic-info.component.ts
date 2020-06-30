import { PatientService } from "./../../services/patient.service";
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
    teams = [];
    editMode = false;
    patient: Patient = new Patient();
    items: MenuItem[];
    home: MenuItem;
    filteredCountries: any[];
    hideDiscard = false;
    genderType;
    selectedCountry;
    selectedTeam;
    showTeams = false;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private countryService: PatientCountryService,
        private patientService: PatientService
    ) {}

    ngOnInit(): void {
        this.gender = [
            { name: "Male", code: "M" },
            { name: "Female", code: "F" },
        ];
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        let LoggedInUser = JSON.parse(localStorage.getItem("user"));
        if (LoggedInUser.teams.length > 1) {
            this.teams = LoggedInUser.teams;
            this.showTeams = true;
        } else if (LoggedInUser.teams.length === 1) {
            this.patient.teamId = LoggedInUser.teams[0].id;
        } else {
            this.patient.teamId = 0;
        }
        this.patient.createdBy = LoggedInUser.fullName;
        this.patient.lastModifiedBy = LoggedInUser.fullName;
        if (selectedPatient) {
            this.patient = selectedPatient;
            this.genderType = this.gender.find(
                (g) => g.code === selectedPatient.gender
            );
            this.selectedTeam = this.teams.find(
                (t) => t.id === selectedPatient.teamId
            );
            this.selectedCountry = { name: selectedPatient.country };
            this.patient.dateOfBirth = new Date(selectedPatient.dateOfBirth);
            this.items = [
                {
                    label: "Patients",
                    command: (event) => {
                        this.goToDashboard(event);
                    },
                },
                {
                    label:
                        selectedPatient.firstName +
                        " " +
                        selectedPatient.lastName,
                },
            ];
            this.hideDiscard = true;
            this.getPatientMedicalInfoById(this.patient.id);
        } else {
            this.items = [
                {
                    label: "Patients",
                    command: (event) => {
                        this.goToDashboard(event);
                    },
                },
                { label: "Create Patient" },
            ];
        }
        this.home = { icon: "fa fa-user-md" };
    }
    reset() {
        this.patient = new Patient();
        this.genderType = {};
        this.selectedCountry = {};
    }
    save() {
        this.validatePatient((callback) => {
            if (callback === "valid") {
                if (this.showTeams) {
                    if (!this.selectedTeam) {
                        this.showMessage(
                            "error",
                            "Validation Error",
                            "Please select a team"
                        );
                        return false;
                    }
                }
                if (this.selectedTeam) {
                    this.patient.teamId = this.selectedTeam.id;
                }
                this.spinner.show();
                this.patient.gender = this.genderType.code;
                this.patient.country = this.selectedCountry.name;
                const {
                    bloodType,
                    emergencyContact,
                    emergencyPhone,
                    ...patient
                } = this.patient;
                const patientMedicalInfo = (({
                    bloodType,
                    emergencyContact,
                    emergencyPhone,
                }) => ({ bloodType, emergencyContact, emergencyPhone }))(
                    this.patient
                );
                let newPatient = {
                    patient,
                    patientMedicalInfo,
                };
                if (this.patient.id) {
                    patient.lastModifiedAt = new Date();
                    this.patientService
                        .updatePatientWithMedicalInfo(
                            this.patient.id,
                            newPatient
                        )
                        .subscribe((p) => {
                            localStorage.setItem(
                                "selectedPatient",
                                JSON.stringify(this.patient)
                            );
                            this.showMessage(
                                "success",
                                "Confirmed",
                                "patient Updated Successfully"
                            );
                            this.router
                                .navigateByUrl("/RefreshComponent", {
                                    skipLocationChange: true,
                                })
                                .then(() => {
                                    this.router.navigate([
                                        "/dashboard/patient",
                                    ]);
                                });
                            this.spinner.hide();
                        });
                } else {
                    this.patientService
                        .createPatient(newPatient)
                        .subscribe((u: any) => {
                            this.patient.id = u.patient.id;
                            localStorage.setItem(
                                "selectedPatient",
                                JSON.stringify(this.patient)
                            );
                            this.router
                                .navigateByUrl("/RefreshComponent", {
                                    skipLocationChange: true,
                                })
                                .then(() => {
                                    this.router.navigate([
                                        "/dashboard/patient",
                                    ]);
                                });
                            // this.reset();
                            this.spinner.hide();
                            this.showMessage(
                                "success",
                                "Saved",
                                "Data saved successfully"
                            );
                        });
                }
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
        if (!this.patient.mobile) {
            this.showMessage("error", "Validation Error", "Mobile is required");
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
        if (!this.genderType) {
            this.showMessage("error", "Validation Error", "Gender is required");
            return false;
        }
        if (!this.selectedCountry) {
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
    getPatientMedicalInfoById(patientId) {
        this.spinner.show();
        this.patientService
            .getPatientMedicalInfoById(patientId)
            .subscribe((result) => {
                if (result) {
                    this.patient.bloodType = result.bloodType;
                    this.patient.emergencyContact = result.emergencyContact;
                    this.patient.emergencyPhone = result.emergencyPhone;
                }
                this.spinner.hide();
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
