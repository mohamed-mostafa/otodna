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
    selector: "app-clinical-history-pathology",
    templateUrl: "./clinical-history-pathology.component.html",
    styleUrls: ["./clinical-history-pathology.component.css"],
})
export class ClinicalHistoryPathologyComponent implements OnInit {
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
    allDiagnosisPathologies = [];
    showTests = true;
    ear;
    displayTest = false;
    showDialogRightData = true;
    showDialogLeftData = true;
    rightPathologies: any[] = [];
    leftPathologies: any[] = [];
    pathologyBreadCrumb = [];
    home: MenuItem;
    selectedTest;
    showPathologyLoading = false;
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
        this.pathologyBreadCrumb = [
            {
                label: "Pathologies",
                command: () => {
                    this.reset();
                },
            },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.checkLoggedInUserTeamWithPatient();
        this.getAllDiagnosisPathologies();
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
    showDiagnosisPathologies() {
        this.displayTest = false;
    }
    showSearchPathologies() {
        this.showTests = true;
        this.pathologyBreadCrumb = [
            {
                label: "Pathologies",
                command: () => {
                    this.reset();
                },
            },
        ];
    }
    async getAllDiagnosisPathologies() {
        this.showPathologyLoading = true;
        this.documentService
            .getAllTests("diagnosisPathology")
            .then((result) => {
                this.allDiagnosisPathologies = result;
                this.showPathologyLoading = false;
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
                this.showPathologyLoading = false;
            });
    }
    async filterTest(event) {
        const query = event.query;
        this.documentService
            .getAllTests("diagnosisPathology")
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
        return await this.sharedClass.searchTest(query, tests, "diseaseName");
    }
    showRightPathologyDialog() {
        this.displayTest = true;
        this.showDialogLeftData = false;
        this.showDialogRightData = true;
        this.ear = "R";
    }
    showLeftPathologyDialog() {
        this.displayTest = true;
        this.showDialogRightData = false;
        this.showDialogLeftData = true;
        this.ear = "L";
    }
    getAllClinicalHistories() {
        this.spinner.show();
        this.clinicalHistoryService
            .getSelectedClinicalHistory(this.selectedPatient.id, "pathologyId")
            .subscribe((result) => {
                this.rightPathologies = [];
                this.leftPathologies = [];
                result.forEach((element) => {
                    if (element.ear === "R") {
                        this.rightPathologies.push(element);
                    }
                    if (element.ear === "L") {
                        this.leftPathologies.push(element);
                    }
                    if (element.ear === "BOTH") {
                        this.rightPathologies.push(element);
                        this.leftPathologies.push(element);
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
            this.pathologyBreadCrumb = [
                {
                    label: "Pathologies",
                    command: () => {
                        this.reset();
                    },
                },
                {
                    label: test.diseaseName,
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
                    pathologyId: this.selectedTest.diseaseId,
                    pathologyName: this.selectedTest.diseaseName,
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
                    pathologyId: this.selectedTest.diseaseId,
                    pathologyName: this.selectedTest.diseaseName,
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
        this.pathologyBreadCrumb = [
            {
                label: "Pathologies",
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
        this.pathologyBreadCrumb = [
            {
                label: "Pathologies",
                command: () => {
                    this.reset();
                },
            },
            {
                label: test.pathologyName,
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
        const obj = {
            diseaseId: event.deseaseId,
            diseaseName: event.deseaseName,
        };
        this.openTest(obj);
    }
}
