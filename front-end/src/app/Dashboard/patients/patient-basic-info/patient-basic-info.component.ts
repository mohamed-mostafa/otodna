import { PatientService } from "../services/patient.service";
import { PatientCountryService } from "../services/countryService";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Patient } from "./patient";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-patient-basic-info",
    templateUrl: "./patient-basic-info.component.html",
    styleUrls: ["./patient-basic-info.component.css"],
    providers: [MessageService],
})
export class PatientBasicInfoComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
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
    showAllButtons = true;
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
            this.showAllButtons = false;
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
            this.checkLoggedInUserTeamWithPatient();
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
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.patient.teamId
        );
    }
    reset() {
        this.patient = new Patient();
        this.genderType = {};
        this.selectedCountry = {};
    }
    discard() {
        this.reset();
        this.sharedClass.goToDashboard(this.router);
    }
    save() {
        this.validatePatient((callback) => {
            if (callback === "valid") {
                if (this.showTeams) {
                    if (!this.selectedTeam) {
                        this.showMessageComponent.showMessage(
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
                            this.showMessageComponent.showMessage(
                                "success",
                                "Confirmed",
                                "patient Updated Successfully"
                            );
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
                            this.showMessageComponent.showMessage(
                                "success",
                                "Saved",
                                "Data saved successfully"
                            );
                        });
                }
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    validatePatient(callback) {
        if (!this.patient.firstName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "First name is required"
            );
            return false;
        }
        if (!this.patient.lastName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Last Name is required"
            );
            return false;
        }
        if (!this.patient.mobile) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Mobile is required"
            );
            return false;
        }
        if (!this.patient.dateOfBirth) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Date of birth is required"
            );
            return false;
        }
        if (!this.genderType) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Gender is required"
            );
            return false;
        }
        if (!this.selectedCountry) {
            this.showMessageComponent.showMessage(
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
        this.sharedClass.goToAddDiagnosis(this.router);
    }
    addTreatment() {
        this.sharedClass.goToAddTreatment(this.router);
    }
    addFollowup() {
        this.sharedClass.goToAddFollowup(this.router);
    }
    filterCountry(event) {
        const query = event.query;
        this.countryService.getCountries().then(async (countries) => {
            this.filteredCountries = await this.searchCountry(query, countries);
        });
    }
    async searchCountry(query, countries) {
        return await this.sharedClass.searchTest(query, countries, "name");
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
        this.sharedClass.goToDashboard(this.router);
    }
}
