import { DiagnosisEquipment } from "./../../../settings/diagnosis-equipments/diagnosisEquipment";
import { EquipmentsService } from "./../../../services/equipments.service";
import { FrequentlyUsedComponent } from "./../../shared/frequently-used/frequently-used.component";
import { PatientService } from "./../../services/patient.service";
import { TestParametersComponent } from "./../../shared/test-parameters/test-parameters.component";
import { SharedClass } from "../../shared/sharedFunctions";
import { DocumentsService } from "./../../../services/documents.service";
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
    @ViewChild(FrequentlyUsedComponent) frequentlyUsedComponent;
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    rightTests: any[] = [];
    leftTests: any[] = [];
    test: Test = new Test();
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
    leftDeletedFiles;
    rightDeletedFiles;
    rightImage;
    leftImage;
    leftDeletedImages;
    rightDeletedImages;
    showEquipments = false;
    retrievedEquipments = [];
    selectedEquipment: any;
    diagnosisEquipment: DiagnosisEquipment = new DiagnosisEquipment();
    selectedTestId;
    position;
    showDialogRightData = true;
    showDialogLeftData = true;
    cogsItems = [];
    ear;
    testBreadCrumb = [];
    readonly = false;
    displayViewDetailsDialog: boolean = false;
    constructor(
        private messageService: MessageService,
        private testService: TestsService,
        private parameterValueService: ParameterValueService,
        private router: Router,
        private cdref: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private documentService: DocumentsService,
        private patientService: PatientService,
        private equipmentsService: EquipmentsService,
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
        this.testBreadCrumb = [
            {
                label: "Tests",
                command: () => {
                    this.reset();
                },
            },
        ];
        this.cols = [
            { field: "testId", header: "Test ID", width: "20%" },
            { field: "testName", header: "Test Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.getAllTests();
        this.getSessionTests();
        this.checkLoggedInUserTeamWithPatient();
        if (window.history.state.test) {
            this.retrieveTestData(window.history.state.test);
        }
    }
    showDiagnosisTests() {
        this.displayTest = false;
    }
    showSearchTests() {
        this.showTests = true;
        this.testBreadCrumb = [
            {
                label: "Tests",
                command: () => {
                    this.reset();
                },
            },
        ];
    }
    onClickMenu(data: any) {
        this.cogsItems = [
            {
                label: "Delete Test",
                icon: "fa fa-trash-o",
                command: () => {
                    this.deleteTest(data);
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
    saveTest() {
        if (this.selectedEquipment) {
            let equipmentsArray = [
                {
                    equipmentId: this.selectedEquipment.id,
                    equipmentName: this.selectedEquipment.equipmentName,
                },
            ];
            this.selectedTestData.forEach((element) => {
                element.equipments = equipmentsArray;
            });
        }
        this.selectedTestData.forEach((element) => {
            if (
                this.testParameterComponent.showDialogRightData &&
                this.testParameterComponent.showDialogLeftData
            ) {
                element.ear = "BOTH";
            } else {
                element.ear = this.ear;
            }
            element.testId = this.selected.testId;
            element.sessionTestId = this.selectedSession.id;
        });
        this.test.testId = this.selected.testId;
        this.test.testName = this.selected.testName;
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
                this.getSessionTests();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
            });
    }
    updateTest() {
        this.rightDeletedFiles = this.testParameterComponent.rightDeletedFiles;
        this.leftDeletedFiles = this.testParameterComponent.leftDeletedFiles;
        this.rightDeletedImages = this.testParameterComponent.rightDeletedImages;
        this.leftDeletedImages = this.testParameterComponent.leftDeletedImages;
        if (this.selectedEquipment) {
            let equipmentsArray = [
                {
                    equipmentId: this.selectedEquipment.id,
                    equipmentName: this.selectedEquipment.equipmentName,
                    sessionTestId: this.selected.id,
                },
            ];
            this.selectedTestData.forEach((element) => {
                element.equipments = equipmentsArray;
            });
        }
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.testId;
            element.sessionTestId = this.selected.id;
        });
        this.test.testId = this.selected.testId;
        this.test.testName = this.selected.testName;
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
        this.filteredTests = [];
        this.showSaveButton = true;
        this.showTests = true;
        this.displayTest = false;
        this.rightDeletedFiles = "";
        this.leftDeletedFiles = "";
        this.dialogHeader = "Add New Test";
        this.diagnosisEquipment = new DiagnosisEquipment();
        this.selectedEquipment = "";
        this.testBreadCrumb = [
            {
                label: "Tests",
                command: () => {
                    this.reset();
                },
            },
        ];
    }
    showRightTestDialog() {
        this.displayTest = true;
        this.showDialogLeftData = false;
        this.showDialogRightData = true;
        this.ear = "R";
    }
    showLeftTestDialog() {
        this.displayTest = true;
        this.showDialogRightData = false;
        this.showDialogLeftData = true;
        this.ear = "L";
    }
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    filterTest(event) {
        const query = event.query;
        this.documentService
            .getAllTests("diagnosisTests")
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
        return await this.sharedClass.searchTest(query, tests, "testName");
    }
    getAllTests() {
        this.spinner.show();
        const id = this.selectedSession.departmentId;
        this.documentService
            .getAllTests("diagnosisTests")
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
    selectFrequentlyUsed(event) {
        this.openTest(event);
    }
    checkForEquipment(id) {
        this.diagnosisEquipment = new DiagnosisEquipment();
        this.selectedEquipment = "";
        this.retrievedEquipments = [];
        this.equipmentsService.getEquipmentByTestId(id).subscribe((result) => {
            if (result && result.length > 0) {
                this.showEquipments = true;
                result.forEach((element) => {
                    element.displayName = `${element.equipmentName} - ${element.manufacturerName} - ${element.serialNumber} `;
                    this.retrievedEquipments.push(element);
                });
            } else {
                this.showEquipments = false;
                this.retrievedEquipments = [];
            }
        });
    }
    openTest(test) {
        this.spinner.show();
        this.checkForEquipment(test.testId);
        return new Promise(async (resolve, reject) => {
            this.selected = test;
            const result = await this.documentService
                .getAllTests(test.testId)
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
                this.testBreadCrumb = [
                    {
                        label: "Tests",
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
        delete test.departments;
        test.ear = this.ear;
        this.testService.createSessionTest(test).subscribe((u: any) => {
            this.reset();
            this.getSessionTests();
            this.frequentlyUsedComponent.getFrequentlyUsed();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
            this.spinner.hide();
        });
    }
    getSessionTests() {
        this.spinner.show();
        this.testService
            .getSessionTests(this.selectedSession.id)
            .subscribe((result) => {
                this.rightTests = [];
                this.leftTests = [];
                result.forEach((test) => {
                    this.documentService.getAllTests(test.testId).then(
                        (res) => {
                            test.showEquipment = true;
                            this.testService
                                .getTestEquipmentCount(test.id)
                                .subscribe(async (result) => {
                                    test.equipmentCount = result.count;
                                });
                        },
                        (err) => {
                            test.showEquipment = false;
                        }
                    );
                    if (test.ear === "R") {
                        this.rightTests.push(test);
                    }
                    if (test.ear === "L") {
                        this.leftTests.push(test);
                    }
                    if (test.ear === "BOTH") {
                        this.rightTests.push(test);
                        this.leftTests.push(test);
                    }
                });
                // this.frequentlyUsedComponent.getFrequentlyUsed();
                this.spinner.hide();
            });
    }
    async retrieveTestData(test) {
        this.spinner.show();
        await this.openTest(test);
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
        this.showTests = true;
        if (test.sessionTestEquipments) {
            this.selectedEquipment = this.retrievedEquipments.find(
                (equip) =>
                    equip.id ===
                    parseInt(test.sessionTestEquipments[0].equipmentId)
            );
        }
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
    deleteTest(data) {
        this.confirmationService.confirm({
            message: "Do you want to delete this test?",
            header: "Delete Test Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.parameterValueService
                    .deleteParametersValues(data)
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
        });
    }
    showViewDetailsDialog() {
        this.diagnosisEquipment = this.selectedEquipment;
        this.displayViewDetailsDialog = true;
    }
}
