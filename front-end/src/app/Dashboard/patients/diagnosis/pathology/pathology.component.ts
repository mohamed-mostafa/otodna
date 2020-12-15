import { FrequentlyUsedComponent } from "./../../shared/frequently-used/frequently-used.component";
import { PatientService } from "./../../services/patient.service";
import { SearchResultItemComponent } from "./../../shared/item-search/search-result-item/search-result-item.component";
import { TestParametersComponent } from "./../../shared/test-parameters/test-parameters.component";
import { SharedClass } from "../../shared/sharedFunctions";
import { DocumentsService } from "./../../../services/documents.service";
import { ParameterValueService } from "./../../services/parameter-value.service";
import { PathologyService } from "./../services/pathology.service";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Pathology } from "./pathology";
import { ShowMessageComponent } from "../../../shared/show-message/show-message.component";
@Component({
    selector: "app-pathology",
    templateUrl: "./pathology.component.html",
    styleUrls: ["./pathology.component.css"],
})
export class PathologyComponent implements OnInit {
    @ViewChild(TestParametersComponent) testParameterComponent;
    @ViewChild(SearchResultItemComponent) searchResultItemComponent;
    @ViewChild(FrequentlyUsedComponent) frequentlyUsedComponent;
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    selectedPatient;
    cols: any[];
    rightPathologies: any[] = [];
    leftPathologies: any[] = [];
    pathology: Pathology = new Pathology();
    items: MenuItem[];
    home: MenuItem;
    displayTest = false;
    selectedTest;
    filteredTests: any[];
    allTests = [];
    showTests = true;
    selected;
    selectedTestData = [];
    selectedSession;
    dialogHeader;
    showSaveButton = true;
    showAllButtons = true;
    rightFiles: any[] = [];
    leftFiles: any[] = [];
    rightFilePath;
    leftFilePath;
    rightImagePath;
    leftImagePath;
    leftDeletedFiles;
    rightDeletedFiles;
    rightImage;
    leftImage;
    leftDeletedImages;
    rightDeletedImages;
    showDialogRightData = true;
    showDialogLeftData = true;
    ear;
    pathologyBreadCrumb = [];
    readonly = false;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private pathologyService: PathologyService,
        private parameterValueService: ParameterValueService,
        private cdref: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private documentService: DocumentsService,
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.dialogHeader = "Add New Pathology";
        this.pathology.patientSessionId = this.selectedSession.id;
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
            { label: this.selectedSession.displayName },
            {
                label:
                    this.selectedSession.ended === "false"
                        ? "End Session"
                        : "This session is ended",
                command: () => {
                    this.endSession();
                },
                styleClass:
                    this.selectedSession.ended === "false" &&
                    this.showAllButtons
                        ? "endSession"
                        : "displayNone",
            },
        ];
        this.pathologyBreadCrumb = [
            {
                label: "Pathologies",
                command: () => {
                    this.reset();
                },
            },
        ];
        this.cols = [
            { field: "id", header: "ID", width: "20%" },
            { field: "name", header: "Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };

        this.getAllTests();
        this.getAllPathologies();
        this.checkLoggedInUserTeamWithPatient();
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
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
    }
    uploadFiles(id, data, name, side, type) {
        this.spinner.show();
        let filePath;
        let page =
            this.selectedSession.sessionTypeId === 0 ? "Diagnosis" : "Followup";
        filePath = `Patient/${this.selectedPatient.id}/${page}/${this.selectedSession.id}/Test/${id}/${type}/${side}`;
        this.documentService.fileUpload(data, name, filePath).then((res) => {
            this.spinner.hide();
            if (side === "Right") {
                this.rightFiles.splice(0, this.rightFiles.length);
            } else {
                this.leftFiles.splice(0, this.leftFiles.length);
            }
        });
    }
    save() {
        this.selectedTestData.forEach((element) => {
            if (
                this.testParameterComponent.showDialogRightData &&
                this.testParameterComponent.showDialogLeftData
            ) {
                element.ear = "BOTH";
            } else {
                element.ear = this.ear;
            }
            element.testId = this.selected.diseaseId;
            element.sessionPathologyId = this.selectedSession.id;
        });
        this.pathology.diseaseId = this.selected.diseaseId;
        this.pathology.diseaseName = this.selected.diseaseName;
        this.pathology.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .createParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                this.selectedTestData[0].parameters.forEach((test) => {
                    if (test.type === "image") {
                        if (test.rightVal && test.rightVal.length > 0) {
                            this.uploadFiles(
                                u[0].id,
                                test.rightVal,
                                test.name,
                                "Right",
                                "Images"
                            );
                        }
                        if (test.leftVal && test.leftVal.length > 0) {
                            this.uploadFiles(
                                u[0].id,
                                test.leftVal,
                                test.name,
                                "Left",
                                "Images"
                            );
                        }
                    } else if (test.type === "file") {
                        if (test.rightVal && test.rightVal.length > 0) {
                            this.uploadFiles(
                                u[0].id,
                                test.rightVal,
                                test.name,
                                "Right",
                                "Files"
                            );
                        }
                        if (test.leftVal && test.leftVal.length > 0) {
                            this.uploadFiles(
                                u[0].id,
                                test.leftVal,
                                test.name,
                                "Left",
                                "Files"
                            );
                        }
                    } else {
                        this.spinner.hide();
                    }
                });
                this.reset();
                this.getAllPathologies();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
            });
    }
    update() {
        this.rightDeletedFiles = this.testParameterComponent.rightDeletedFiles;
        this.leftDeletedFiles = this.testParameterComponent.leftDeletedFiles;
        this.rightDeletedImages = this.testParameterComponent.rightDeletedImages;
        this.leftDeletedImages = this.testParameterComponent.leftDeletedImages;
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.diseaseId;
            element.sessionPathologyId = this.selected.id;
        });
        this.pathology.diseaseId = this.selected.diseaseId;
        this.pathology.diseaseName = this.selected.diseaseName;
        this.pathology.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .updateParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                if (
                    this.rightDeletedImages &&
                    this.rightDeletedImages.length > 0
                ) {
                    this.rightDeletedImages.forEach((element) => {
                        this.documentService.deleteFile(element);
                    });
                }
                if (
                    this.leftDeletedImages &&
                    this.leftDeletedImages.length > 0
                ) {
                    this.leftDeletedImages.forEach((element) => {
                        this.documentService.deleteFile(element);
                    });
                }
                if (
                    this.rightDeletedFiles &&
                    this.rightDeletedFiles.length > 0
                ) {
                    this.rightDeletedFiles.forEach((element) => {
                        this.documentService.deleteFile(element);
                    });
                }
                if (this.leftDeletedFiles && this.leftDeletedFiles.length > 0) {
                    this.leftDeletedFiles.forEach((element) => {
                        this.documentService.deleteFile(element);
                    });
                }
                this.selectedTestData[0].parameters.forEach((test) => {
                    if (test.type === "image") {
                        if (test.rightVal && test.rightVal.length > 0) {
                            this.uploadFiles(
                                this.selected.id,
                                test.rightVal,
                                test.name,
                                "Right",
                                "Images"
                            );
                        }
                        if (test.leftVal && test.leftVal.length > 0) {
                            this.uploadFiles(
                                this.selected.id,
                                test.leftVal,
                                test.name,
                                "Left",
                                "Images"
                            );
                        }
                    } else if (test.type === "file") {
                        if (test.rightVal && test.rightVal.length > 0) {
                            this.uploadFiles(
                                this.selected.id,
                                test.rightVal,
                                test.name,
                                "Right",
                                "Files"
                            );
                        }
                        if (test.leftVal && test.leftVal.length > 0) {
                            this.uploadFiles(
                                this.selected.id,
                                test.leftVal,
                                test.name,
                                "Left",
                                "Files"
                            );
                        }
                    } else {
                        this.spinner.hide();
                    }
                });
                this.reset();
                this.getAllPathologies();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
            });
    }
    reset() {
        // this.searchResultItemComponent.reset();
        this.selectedTest = "";
        this.selected = "";
        this.filteredTests = [];
        this.showTests = true;
        this.showSaveButton = true;
        this.displayTest = false;
        this.rightDeletedFiles = "";
        this.leftDeletedFiles = "";
        this.pathology = new Pathology();
        this.dialogHeader = "Add New Pathology";
        this.pathologyBreadCrumb = [
            {
                label: "Pathologies",
                command: () => {
                    this.reset();
                },
            },
        ];
    }
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    async getAllTests() {
        this.spinner.show();
        const id = this.selectedSession.departmentId;
        this.documentService
            .getAllTests("diagnosisPathology")
            .then((result) => {
                for (const r of result) {
                    for (const dep of r.departments) {
                        if (dep.id === id) {
                            this.allTests.push(r);
                        }
                    }
                }
                this.spinner.hide();
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
                this.spinner.hide();
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
    getAllPathologies() {
        this.spinner.show();
        this.pathologyService
            .getAllPathologies(this.selectedSession.id)
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
                // this.frequentlyUsedComponent.getFrequentlyUsed();
                this.spinner.hide();
            });
    }
    selectFrequentlyUsed(event) {
        const obj = {
            diseaseId: event.deseaseId,
            diseaseName: event.deseaseName,
        };
        this.openTest(obj);
    }
    openTest(test) {
        this.spinner.show();
        return new Promise(async (resolve, reject) => {
            this.selected = test;
            const result = await this.documentService
                .getAllTests(test.diseaseId)
                .catch((error) => {
                    if (this.showTests) {
                        test.patientSessionId = this.selectedSession.id;
                        this.saveWithoutParams(test);
                        resolve(test);
                    } else {
                        this.showTests = true;
                        reject(false);
                    }
                    this.spinner.hide();
                });
            if (result) {
                this.selectedTestData = result;
                this.showTests = false;
                this.dialogHeader = result.map((r) => r.name);
                this.pathologyBreadCrumb = [
                    {
                        label: "Pathologies",
                        command: () => {
                            this.reset();
                        },
                    },
                    {
                        label: this.dialogHeader,
                    },
                    {
                        label: "Parameters",
                    },
                ];
                resolve(this.selectedTestData);
                if (this.showSaveButton) {
                    this.spinner.hide();
                }
            }
        });
    }
    saveWithoutParams(test) {
        this.spinner.show();
        delete test.departments;
        test.ear = this.ear;
        this.pathologyService.createPathology(test).subscribe((u: any) => {
            this.reset();
            this.getAllPathologies();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
            this.searchResultItemComponent.reset();
            this.spinner.hide();
        });
    }
    async retrieveTestData(test) {
        this.spinner.show();
        if (this.selectedSession.ended === "false") {
            this.readonly = false;
        } else {
            this.readonly = true;
        }
        if (test.ear === "BOTH") {
            this.showDialogRightData = true;
            this.showDialogLeftData = true;
        } else if (test.ear === "R") {
            this.showDialogLeftData = false;
            this.showDialogRightData = true;
            this.ear = "R";
        } else {
            this.showDialogRightData = false;
            this.showDialogLeftData = true;
            this.ear = "L";
        }
        this.showSaveButton = false;
        await this.openTest(test);
        this.showTests = true;
        if (test.parameterValues) {
            let parameters = this.selectedTestData[0].parameters;
            if (parameters && parameters.length > 0) {
                parameters = await this.sharedClass.handleTestData(
                    test.parameterValues,
                    parameters
                );
                await this.checkForImagesAndFiles(test);
                this.showTests = false;
                this.displayTest = true;
            }
            this.cdref.detectChanges();
        } else {
            this.showTests = true;
        }
        this.spinner.hide();
    }
    async checkForImagesAndFiles(test) {
        let page =
            this.selectedSession.sessionTypeId === 0 ? "Diagnosis" : "Followup";
        this.selectedTestData[0].parameters.forEach(async (param) => {
            if (param.type === "image") {
                this.rightImagePath = `Patient/${this.selectedPatient.id}/${page}/${this.selectedSession.id}/Test/${test.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                let retrievedRightImage = [];
                rightImage.Contents.forEach((content) => {
                    if (
                        content.Key === `${this.rightImagePath}/${param.name}`
                    ) {
                        retrievedRightImage.push(content);
                    }
                });
                param.retrievedRightImage = retrievedRightImage;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/${page}/${this.selectedSession.id}/Test/${test.id}/Images/Left`;
                const leftImage = await this.documentService.getAllFiles(
                    this.leftImagePath
                );
                let retrievedLeftImage = [];
                leftImage.Contents.forEach((content) => {
                    if (content.Key === `${this.leftImagePath}/${param.name}`) {
                        retrievedLeftImage.push(content);
                    }
                });
                param.retrievedLeftImage = retrievedLeftImage;
            } else if (param.type === "file") {
                this.rightFilePath = `Patient/${this.selectedPatient.id}/${page}/${this.selectedSession.id}/Test/${test.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                let retrievedRightImage = [];
                right.Contents.forEach((content) => {
                    if (
                        content.Key === `${this.rightImagePath}/${param.name}`
                    ) {
                        retrievedRightImage.push(content);
                    }
                });
                param.retrievedRightImage = retrievedRightImage;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/${page}/${this.selectedSession.id}/Test/${test.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                let retrievedLeftFile = [];
                left.Contents.forEach((content) => {
                    if (content.Key === `${this.leftImagePath}/${param.name}`) {
                        retrievedLeftFile.push(content);
                    }
                });
                param.retrievedLeftFile = retrievedLeftFile;
            } else return false;
        });
    }
    endSession() {
        if (this.selectedSession.ended === "false") {
            this.sharedClass.endSession(this.router.url, this.router);
        }
    }
    deletePathology(data) {
        this.confirmationService.confirm({
            message: "Do you want to delete this pathology?",
            header: "Delete Pathology Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.parameterValueService
                    .deleteParametersValues(data)
                    .subscribe((u: any) => {
                        this.getAllPathologies();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Pathology test has been deleted"
                );
            },
        });
    }
    receiveTest(event) {
        this.openTest(event);
    }
}
