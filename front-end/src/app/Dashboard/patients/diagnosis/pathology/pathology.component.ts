import { SearchResultItemComponent } from "./../../shared/search-result-item/search-result-item.component";
import { TestParametersComponent } from "./../../shared/test-parameters/test-parameters.component";
import { SharedClass } from "../../shared/sharedFunctions";
import { DocumentsService } from "./../../../services/documents.service";
import { TeamsService } from "./../../../services/teams.service";
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
    providers: [MessageService, ConfirmationService],
})
export class PathologyComponent implements OnInit {
    @ViewChild(TestParametersComponent) testParameterComponent;
    @ViewChild(SearchResultItemComponent) searchResultItemComponent;
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    selectedPatient;
    cols: any[];
    pathologies: any[] = [];
    pathology: Pathology = new Pathology();
    items: MenuItem[];
    home: MenuItem;
    displayTest: boolean;
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
    savedRightFiles = [];
    savedLeftFiles = [];
    rightFilePath;
    leftFilePath;
    savedRightImage = [];
    savedLeftImage = [];
    rightImagePath;
    leftImagePath;
    leftDocument;
    rightDocument;
    rightImage;
    leftImage;
    leftDeletedImage;
    rightDeletedImage;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private pathologyService: PathologyService,
        private parameterValueService: ParameterValueService,
        private cdref: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private teamsService: TeamsService,
        private documentService: DocumentsService,
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

    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient.teamId
        );
    }
    uploadFiles(id, data, side, type) {
        this.spinner.show();
        let filePath;
        if (this.selectedSession.sessionTypeId === 0) {
            filePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Pathology/${id}/${type}/${side}`;
        } else {
            filePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Pathology/${id}/${type}/${side}`;
        }
        this.documentService.fileUpload(data, filePath).then((data) => {
            this.spinner.hide();
            if (side === "Right") {
                this.rightFiles.splice(0, this.rightFiles.length);
            } else {
                this.leftFiles.splice(0, this.leftFiles.length);
            }
        });
    }
    save() {
        this.rightImage = this.testParameterComponent.rightImage;
        this.leftImage = this.testParameterComponent.leftImage;
        this.rightFiles = this.testParameterComponent.rightFiles;
        this.leftFiles = this.testParameterComponent.leftFiles;
        this.selectedTestData.forEach((element) => {
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
                if (this.rightImage.length > 0) {
                    this.uploadFiles(
                        u[0].id,
                        this.rightImage,
                        "Right",
                        "Images"
                    );
                }
                if (this.rightFiles.length > 0) {
                    this.uploadFiles(
                        u[0].id,
                        this.rightFiles,
                        "Right",
                        "Files"
                    );
                }
                if (this.leftImage.length > 0) {
                    this.uploadFiles(u[0].id, this.leftImage, "Left", "Images");
                }
                if (this.leftFiles.length > 0) {
                    this.uploadFiles(u[0].id, this.leftFiles, "Left", "Files");
                }
                if (
                    this.leftFiles.length < 0 &&
                    this.rightFiles.length < 0 &&
                    this.rightImage.length < 0 &&
                    this.leftImage.length < 0
                ) {
                    this.spinner.hide();
                }
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
        this.rightImage = this.testParameterComponent.rightImage;
        this.leftImage = this.testParameterComponent.leftImage;
        this.rightFiles = this.testParameterComponent.rightFiles;
        this.leftFiles = this.testParameterComponent.leftFiles;
        this.rightDocument = this.testParameterComponent.rightDocument;
        this.leftDocument = this.testParameterComponent.leftDocument;
        this.rightDeletedImage = this.testParameterComponent.rightDeletedImage;
        this.leftDeletedImage = this.testParameterComponent.leftDeletedImage;
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.diseaseId;
            element.sessionPathologyId = this.selectedSession.id;
        });
        this.pathology.diseaseId = this.selected.diseaseId;
        this.pathology.diseaseName = this.selected.diseaseName;
        this.pathology.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .updateParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                if (this.rightDeletedImage) {
                    this.documentService.deleteFile(this.rightDeletedImage.Key);
                }
                if (this.leftDeletedImage) {
                    this.documentService.deleteFile(this.leftDeletedImage.Key);
                }
                if (this.rightDocument) {
                    this.documentService.deleteFile(this.rightDocument.Key);
                }
                if (this.leftDocument) {
                    this.documentService.deleteFile(this.leftDocument.Key);
                }
                if (this.rightImage.length > 0) {
                    this.uploadFiles(
                        u[0].id,
                        this.rightImage,
                        "Right",
                        "Images"
                    );
                }
                if (this.rightFiles.length > 0) {
                    this.uploadFiles(
                        u[0].id,
                        this.rightFiles,
                        "Right",
                        "Files"
                    );
                }
                if (this.leftImage.length > 0) {
                    this.uploadFiles(u[0].id, this.leftImage, "Left", "Images");
                }
                if (this.leftFiles.length > 0) {
                    this.uploadFiles(u[0].id, this.leftFiles, "Left", "Files");
                }
                if (
                    this.leftFiles.length < 0 &&
                    this.rightFiles.length < 0 &&
                    this.rightImage.length < 0 &&
                    this.leftImage.length < 0
                ) {
                    this.spinner.hide();
                }
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
        this.selectedTest = "";
        this.selected = "";
        this.filteredTests = [];
        this.showTests = true;
        this.showSaveButton = true;
        this.displayTest = false;
        this.rightDocument = "";
        this.leftDocument = "";
        this.pathology = new Pathology();
        this.dialogHeader = "Add New Pathology";
    }
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    getAllTests() {
        if (this.selectedPatient.teamId === 0) {
            this.pathologyService.getTest("diagnosisPathology").then((res) => {
                this.allTests = res;
            });
        } else {
            const promise = new Promise((resolve) => {
                this.teamsService
                    .getTeamById(this.selectedPatient.teamId)
                    .subscribe((result) => {
                        resolve(result);
                    });
            });
            promise.then((data: any) => {
                const id = data.departmentId;
                this.pathologyService
                    .getTest("diagnosisPathology")
                    .then((res) => {
                        for (const r of res) {
                            for (const dep of r.departments) {
                                if (dep.id === id) {
                                    this.allTests.push(r);
                                }
                            }
                        }
                    });
            });
        }
    }
    filterTest(event) {
        const query = event.query;
        this.pathologyService
            .getTest("diagnosisPathology")
            .then(async (tests) => {
                this.filteredTests = await this.searchTest(query, tests);
            });
    }
    async searchTest(query, tests) {
        return await this.sharedClass.searchTest(query, tests, "diseaseName");
    }
    showTestDialog() {
        this.displayTest = true;
    }
    getAllPathologies() {
        this.spinner.show();
        this.pathologyService
            .getAllPathologies(this.selectedSession.id)
            .subscribe((result) => {
                this.pathologies = result;
                this.spinner.hide();
            });
    }
    openTest(test) {
        return new Promise((resolve, reject) => {
            this.selected = test;
            this.savedRightFiles = [];
            this.savedLeftFiles = [];
            this.savedLeftImage = [];
            this.savedRightImage = [];
            this.pathologyService.getTest(test.diseaseId).then(
                (res) => {
                    this.selectedTestData = res;
                    this.showTests = false;
                    this.dialogHeader = res.map((r) => r.name);
                    resolve(this.selectedTestData);
                },
                (err) => {
                    if (this.showTests) {
                        test.patientSessionId = this.selectedSession.id;
                        this.saveWithoutParams(test);
                        resolve();
                    } else {
                        this.showTests = true;
                        reject(false);
                    }
                }
            );
        });
    }
    saveWithoutParams(test) {
        delete test.departments;
        this.pathologyService.createPathology(test).subscribe((u: any) => {
            this.reset();
            this.getAllPathologies();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
            this.spinner.hide();
        });
    }
    async retrieveTestData(test) {
        await this.openTest(test);
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.showTests = true;
        this.spinner.show();
        this.pathologyService
            .getTestParametersValues(test.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    if (
                        this.selectedTestData &&
                        this.selectedTestData.length > 0
                    ) {
                        this.showSaveButton = false;
                        this.selectedTestData[0].id = test.id;
                        let parameters = this.selectedTestData[0].parameters;
                        if (parameters && parameters.length > 0) {
                            parameters = await this.sharedClass.handleTestData(
                                result,
                                parameters
                            );
                            await this.checkForImagesAndFiles(test);
                            this.showTests = false;
                            this.displayTest = true;
                        }
                    }
                    this.cdref.detectChanges();
                } else {
                    this.showTests = true;
                }
                this.spinner.hide();
            });
    }
    async checkForImagesAndFiles(test) {
        const found = this.selectedTestData[0].parameters.some(
            (param) => param.type === "image" || param.type === "file"
        );
        if (found) {
            if (this.selectedSession.sessionTypeId === 0) {
                this.rightFilePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Pathology/${test.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                this.savedRightFiles = right.Contents;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Pathology/${test.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                this.savedLeftFiles = left.Contents;
                this.rightImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Pathology/${test.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                this.savedRightImage = rightImage.Contents;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Pathology/${test.id}/Images/Left`;
                const leftImage = await this.documentService.getAllFiles(
                    this.leftImagePath
                );
                this.savedLeftImage = leftImage.Contents;
            } else {
                this.rightFilePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Pathology/${test.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                this.savedRightFiles = right.Contents;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Pathology/${test.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                this.savedLeftFiles = left.Contents;
                this.rightImagePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Pathology/${test.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                this.savedRightImage = rightImage.Contents;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Pathology/${test.id}/Images/Left`;
                const leftImage = await this.documentService.getAllFiles(
                    this.leftImagePath
                );
                this.savedLeftImage = leftImage.Contents;
            }
        }
    }
    endSession() {
        this.sharedClass.endSession(this.router.url, this.router);
    }
    deletePathology(data) {
        this.confirmationService.confirm({
            message: "Do you want to delete this pathology?",
            header: "Delete Pathology Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.pathologyService
                    .deletePathology(data.id)
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
            reject: () => {
                this.showMessageComponent.showMessage(
                    "info",
                    "Rejected",
                    "You have rejected"
                );
            },
        });
    }
    receiveTest(event) {
        this.openTest(event);
    }
}
