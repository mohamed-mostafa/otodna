import { TestParametersComponent } from "./../../shared/test-parameters/test-parameters.component";
import { SharedClass } from "../../shared/sharedFunctions";
import { DocumentsService } from "./../../../services/documents.service";
import { TeamsService } from "./../../../services/teams.service";
import { ParameterValueService } from "./../../services/parameter-value.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Test } from "./test";
import { TestsService } from "../services/tests.service";
import { ShowMessageComponent } from "../../../shared/show-message/show-message.component";
@Component({
    selector: "app-tests",
    templateUrl: "./tests.component.html",
    styleUrls: ["./tests.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class TestsComponent implements OnInit {
    @ViewChild(TestParametersComponent) testParameterComponent;
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    tests: any[] = [];
    test: Test = new Test();
    items: MenuItem[];
    home: MenuItem;
    displayTest: boolean;
    selectedTest;
    filteredTests: any[];
    allTests = [];
    allEquipments = [];
    showTests = true;
    selected;
    selectedTestData = [];
    selectedSession;
    dialogHeader;
    filteredEquipments: any[];
    selectedEquipments = [];
    showSaveButton = true;
    showAllButtons = true;
    selectedPatient;
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
        private testService: TestsService,
        private parameterValueService: ParameterValueService,
        private router: Router,
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
        this.dialogHeader = "Add New Test";
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
            { field: "testId", header: "Test ID", width: "20%" },
            { field: "testName", header: "Test Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.getAllTests();
        this.getAllEquipments();
        this.getSessionTests();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient.teamId
        );
    }
    getEquipmentsAllData(data) {
        const allSelectedEquipments = [];
        for (const d of data) {
            for (const a of this.allEquipments) {
                if (a.name === d) {
                    allSelectedEquipments.push(a);
                }
            }
        }
        return allSelectedEquipments;
    }
    uploadFiles(id, data, side, type) {
        this.spinner.show();
        let filePath;
        if (this.selectedSession.sessionTypeId === 0) {
            filePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/${id}/${type}/${side}`;
        } else {
            filePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/${id}/${type}/${side}`;
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
    saveTest() {
        this.rightImage = this.testParameterComponent.rightImage;
        this.leftImage = this.testParameterComponent.leftImage;
        this.rightFiles = this.testParameterComponent.rightFiles;
        this.leftFiles = this.testParameterComponent.leftFiles;
        if (this.selectedEquipments && this.selectedEquipments.length > 0) {
            const equipmentsAllData = this.getEquipmentsAllData(
                this.selectedEquipments
            );
            this.selectedTestData.forEach((element) => {
                element.equipments = equipmentsAllData;
            });
        }
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.testId;
            element.sessionTestId = this.selectedSession.id;
        });
        this.test.testId = this.selected.testId;
        this.test.testName = this.selected.testName;
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
                this.getSessionTests();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
            });
    }
    updateTest() {
        this.rightImage = this.testParameterComponent.rightImage;
        this.leftImage = this.testParameterComponent.leftImage;
        this.rightFiles = this.testParameterComponent.rightFiles;
        this.leftFiles = this.testParameterComponent.leftFiles;
        this.rightDocument = this.testParameterComponent.rightDocument;
        this.leftDocument = this.testParameterComponent.leftDocument;
        this.rightDeletedImage = this.testParameterComponent.rightDeletedImage;
        this.leftDeletedImage = this.testParameterComponent.leftDeletedImage;
        if (this.selectedEquipments && this.selectedEquipments.length > 0) {
            const equipmentsAllData = this.getEquipmentsAllData(
                this.selectedEquipments
            );
            this.selectedTestData.forEach((element) => {
                element.equipments = equipmentsAllData;
            });
        }
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.testId;
            element.sessionTestId = this.selectedSession.id;
        });
        this.test.testId = this.selected.testId;
        this.test.testName = this.selected.testName;
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
                this.getSessionTests();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data updated successfully"
                );
            });
    }
    reset() {
        this.test = new Test();
        this.selectedTest = "";
        this.selected = "";
        this.selectedEquipments = [];
        this.filteredTests = [];
        this.showSaveButton = true;
        this.showTests = true;
        this.displayTest = false;
        this.rightDocument = "";
        this.leftDocument = "";
        this.dialogHeader = "Add New Test";
    }

    showTestDialog() {
        this.displayTest = true;
    }
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    filterTest(event) {
        const query = event.query;
        this.testService.getTest("diagnosisTests").then(async (tests) => {
            this.filteredTests = await this.searchTest(query, tests);
        });
    }
    async searchTest(query, tests) {
        return await this.sharedClass.searchTest(query, tests, "testName");
    }
    getAllTests() {
        if (this.selectedPatient.teamId === 0) {
            this.testService.getTest("diagnosisTests").then((res) => {
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
                this.testService.getTest("diagnosisTests").then((res) => {
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
    getAllEquipments() {
        this.testService.getTest("equipments").then((res) => {
            this.allEquipments = res;
        });
    }
    async openTest(test) {
        this.selected = test;
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.testService.getTest(test.testId).then(
            (res) => {
                this.selectedTestData = res;
                this.showTests = false;
                this.dialogHeader = res.map((r) => r.name);
            },
            (err) => {
                if (this.showTests) {
                    test.patientSessionId = this.selectedSession.id;
                    this.saveWithoutParams(test);
                } else {
                    this.showTests = true;
                    return false;
                }
            }
        );
    }
    saveWithoutParams(test) {
        delete test.departments;
        this.testService.createSessionTest(test).subscribe((u: any) => {
            this.reset();
            this.getSessionTests();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
            this.spinner.hide();
        });
    }
    filterEquipments(event) {
        this.filteredEquipments = [];
        for (const item of this.allEquipments) {
            const brand = item.name;
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredEquipments.push(brand);
            }
        }
    }
    getSessionTests() {
        this.spinner.show();
        this.testService
            .getSessionTests(this.selectedSession.id)
            .subscribe((result) => {
                this.tests = result;
                this.spinner.hide();
            });
    }
    async retrieveTestData(test) {
        await this.openTest(test);
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.showTests = false;
        this.spinner.show();
        this.testService.getSessionTestEquipment(test.id).subscribe((res) => {
            if (res && res.length > 0) {
                this.showSaveButton = false;
                this.selectedTestData[0].id = test.id;
                res.forEach((element) => {
                    this.selectedEquipments.push(element.equipmentName);
                });
            }
        });
        this.testService
            .getTestParametersValues(test.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    this.selectedTestData[0].id = test.id;
                    this.showSaveButton = false;
                    let parameters = this.selectedTestData[0].parameters;
                    if (parameters && parameters.length > 0) {
                        parameters = await this.sharedClass.handleTestData(
                            result,
                            parameters
                        );
                        await this.checkForImagesAndFiles(test);
                    }
                    this.displayTest = true;
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
                this.rightFilePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/${test.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                this.savedRightFiles = right.Contents;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/${test.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                this.savedLeftFiles = left.Contents;
                this.rightImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/${test.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                this.savedRightImage = rightImage.Contents;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/${test.id}/Images/Left`;
                const leftImage = await this.documentService.getAllFiles(
                    this.leftImagePath
                );
                this.savedLeftImage = leftImage.Contents;
            } else {
                this.rightFilePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/${test.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                this.savedRightFiles = right.Contents;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/${test.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                this.savedLeftFiles = left.Contents;
                this.rightImagePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/${test.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                this.savedRightImage = rightImage.Contents;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/${test.id}/Images/Left`;
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
    deleteTest(data) {
        this.confirmationService.confirm({
            message: "Do you want to delete this test?",
            header: "Delete Test Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.testService
                    .deleteSessionTest(data.id)
                    .subscribe((u: any) => {
                        this.getSessionTests();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Test has been deleted"
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
}
