import { Parameters } from "./../clinical-history-parameters/parameters";
import { ClinicalHistoryService } from "./../../services/clinical-history.service";
import { PatientService } from "./../../services/patient.service";
import { SharedClass } from "../../shared/sharedFunctions";
import { DocumentsService } from "./../../../services/documents.service";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { ShowMessageComponent } from "../../../shared/show-message/show-message.component";
@Component({
    selector: "app-clinical-history-treatment",
    templateUrl: "./clinical-history-treatment.component.html",
    styleUrls: ["./clinical-history-treatment.component.css"],
})
export class ClinicalHistoryTreatmentComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    parameters: Parameters = new Parameters();
    selectedPatient;
    showSaveButton = true;
    showAllButtons = true;
    cogsItems = [];
    filteredTests: any[];
    allTreatments = [];
    showTests = true;
    ear;
    displayTest = false;
    showDialogRightData = true;
    showDialogLeftData = true;
    rightTreatments: any[] = [];
    leftTreatments: any[] = [];
    treatmentBreadCrumb = [];
    home: MenuItem;
    selectedTest;
    showTreatmentLoading = false;
    constructor(
        private messageService: MessageService,
        private documentService: DocumentsService,
        private patientService: PatientService,
        private confirmationService: ConfirmationService,
        private clinicalHistoryService: ClinicalHistoryService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.treatmentBreadCrumb = [
            {
                label: "Treatments",
                command: () => {
                    this.reset();
                },
            },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.checkLoggedInUserTeamWithPatient();
        this.getAllTreatments();
        this.getAllClinicalHistories();
        if (window.history.state.clinical) {
            this.retrieveTestData(window.history.state.clinical);
        }
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
    }
    showTreatments() {
        this.displayTest = false;
    }
    showSearchTreatment() {
        this.showTests = true;
        this.treatmentBreadCrumb = [
            {
                label: "Treatments",
                command: () => {
                    this.reset();
                },
            },
        ];
    }
    async getAllTreatments() {
        this.showTreatmentLoading = true;
        this.documentService
            .getAllTests("treatmentTests")
            .then((result) => {
                this.allTreatments = result;
                this.showTreatmentLoading = false;
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
                this.showTreatmentLoading = false;
            });
    }
    async filterTest(event) {
        const query = event.query;
        this.documentService
            .getAllTests("treatmentTests")
            .then(async (tests) => {
                this.filteredTests = await this.searchTest(query, tests);
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
            });
    }
    async searchTest(query, tests) {
        return await this.sharedClass.searchTest(query, tests, "treatmentName");
    }
    showRightTreatmentDialog() {
        this.displayTest = true;
        this.showDialogLeftData = false;
        this.showDialogRightData = true;
        this.ear = "R";
    }
    showLeftTreatmentDialog() {
        this.displayTest = true;
        this.showDialogRightData = false;
        this.showDialogLeftData = true;
        this.ear = "L";
    }
    getAllClinicalHistories() {
        this.spinner.show();
        this.clinicalHistoryService
            .getSelectedClinicalHistory(this.selectedPatient.id, "treatmentId")
            .subscribe((result) => {
                this.rightTreatments = [];
                this.leftTreatments = [];
                result.forEach((element) => {
                    if (element.ear === "R") {
                        this.rightTreatments.push(element);
                    }
                    if (element.ear === "L") {
                        this.leftTreatments.push(element);
                    }
                    if (element.ear === "BOTH") {
                        this.rightTreatments.push(element);
                        this.leftTreatments.push(element);
                    }
                });
                this.spinner.hide();
            });
    }
    receiveTest(event) {
        this.openTest(event);
    }
    openTest(test) {
        this.selectedTest = test;
        this.spinner.show();
        return new Promise(async (resolve, reject) => {
            this.showTests = false;
            this.treatmentBreadCrumb = [
                {
                    label: "Treatments",
                    command: () => {
                        this.reset();
                    },
                },
                {
                    label: test.treatmentName,
                },
                {
                    label: "Parameters",
                },
            ];
            if (this.showSaveButton) {
                this.spinner.hide();
            }
            resolve();
        });
    }
    save() {
        this.validateParameter((callback) => {
            if (callback === "valid") {
                const obj = {
                    patientId: this.selectedPatient.id,
                    treatmentId: this.selectedTest.treatmentId,
                    treatmentName: this.selectedTest.treatmentName,
                    date: this.parameters.rightDate
                        ? this.parameters.rightDate
                        : this.parameters.leftDate,
                    ear: this.parameters.ear,
                    description: this.parameters.description,
                };
                this.spinner.show();
                this.clinicalHistoryService
                    .createClinicalHistory(obj)
                    .subscribe((u: any) => {
                        this.displayTest = false;
                        this.spinner.hide();
                        this.getAllClinicalHistories();
                        this.reset();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    validateParameter(callback) {
        if (this.showDialogRightData && !this.parameters.rightDate) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Right Date is required"
            );
            return false;
        }
        if (this.showDialogLeftData && !this.parameters.leftDate) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Left Date is required"
            );
            return false;
        }
        if (!this.parameters.ear) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Ear is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    update() {
        this.validateParameter((callback) => {
            if (callback === "valid") {
                const obj = {
                    id: this.selectedTest.id,
                    patientId: this.selectedPatient.id,
                    treatmentId: this.selectedTest.treatmentId,
                    treatmentName: this.selectedTest.treatmentName,
                    date: this.parameters.rightDate
                        ? this.parameters.rightDate
                        : this.parameters.leftDate,
                    ear: this.parameters.ear,
                    description: this.parameters.description,
                };
                this.spinner.show();
                this.clinicalHistoryService
                    .updateClinicalHistory(obj)
                    .subscribe((u: any) => {
                        this.displayTest = false;
                        this.spinner.hide();
                        this.getAllClinicalHistories();
                        this.reset();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    reset() {
        this.treatmentBreadCrumb = [
            {
                label: "Treatments",
                command: () => {
                    this.reset();
                },
            },
        ];
        this.parameters = new Parameters();
        this.selectedTest = "";
        this.showSaveButton = true;
        this.filteredTests = [];
        this.showTests = true;
        this.displayTest = false;
    }
    retrieveTestData(test) {
        if (test.ear === "BOTH") {
            this.showDialogRightData = true;
            this.showDialogLeftData = true;
            this.parameters.rightDate = new Date(test.date);
            this.parameters.leftDate = new Date(test.date);
        } else if (test.ear === "R") {
            this.parameters.rightDate = new Date(test.date);
            this.showDialogLeftData = false;
            this.showDialogRightData = true;
            this.ear = "R";
        } else {
            this.parameters.leftDate = new Date(test.date);
            this.showDialogRightData = false;
            this.showDialogLeftData = true;
            this.ear = "L";
        }
        this.displayTest = true;
        this.selectedTest = test;
        this.showTests = false;
        this.showSaveButton = false;
        this.parameters.ear = test.ear;
        this.parameters.description = test.description;
        this.treatmentBreadCrumb = [
            {
                label: "Treatments",
                command: () => {
                    this.reset();
                },
            },
            {
                label: test.treatmentName,
            },
            {
                label: "Parameters",
            },
        ];
    }
    delete(test) {
        this.confirmationService.confirm({
            message: "Do you want to delete this clinical history?",
            header: "Delete Clinical History Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.clinicalHistoryService
                    .deleteClinicalHistory(test.id)
                    .subscribe((u: any) => {
                        this.getAllClinicalHistories();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Clinical history has been deleted"
                );
            },
        });
    }
    selectFrequentlyUsed(event) {
        this.openTest(event);
    }
}
