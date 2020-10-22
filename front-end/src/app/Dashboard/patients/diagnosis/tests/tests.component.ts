import { EquipmentParameterValueService } from "./../../services/equipment-parameter-value.service";
import { EquipmentTestParametersComponent } from "./../../shared/equipment-test-parameters/equipment-test-parameters.component";
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
    @ViewChild(EquipmentTestParametersComponent)
    equipmentTestParametersComponent;
    sharedClass: SharedClass = new SharedClass();
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
    displayEquipmentTest: boolean;
    showEquipments = true;
    selectedEquipment;
    selectedTestId;
    showViewEquipments = false;
    viewedEquipments = [];
    position;
    selectedEquipmentData = [];
    showSaveEquipmentButton = true;
    addEquipmentDialogHeader;
    viewEquipmentDialogHeader;
    showDialogRightData = true;
    showDialogLeftData = true;
    constructor(
        private messageService: MessageService,
        private testService: TestsService,
        private parameterValueService: ParameterValueService,
        private equipmentParameterValueService: EquipmentParameterValueService,
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
                if (a.equipmentName === d) {
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
            if (
                this.testParameterComponent.showDialogRightData &&
                this.testParameterComponent.showDialogLeftData
            ) {
                element.ear = "BOTH";
            }
            if (
                this.testParameterComponent.showDialogRightData &&
                !this.testParameterComponent.showDialogLeftData
            ) {
                element.ear = "R";
            }
            if (
                this.testParameterComponent.showDialogLeftData &&
                !this.testParameterComponent.showDialogRightData
            ) {
                element.ear = "L";
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
                this.confirmationService.confirm({
                    message: "Do you want to add equipment for this test?",
                    header: "Add Equipment Confirmation",
                    icon: "pi pi-info-circle",
                    accept: () => {
                        this.testService
                            .getTestById(u[0].id)
                            .subscribe((res) => {
                                this.showEquipmentDialog(res);
                            });
                    },
                    reject: () => {
                        this.showMessageComponent.showMessage(
                            "info",
                            "Rejected",
                            "You have rejected"
                        );
                    },
                });
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
    showRightTestDialog() {
        this.displayTest = true;
        this.showDialogLeftData = false;
        this.showDialogRightData = true;
    }
    showLeftTestDialog() {
        this.displayTest = true;
        this.showDialogRightData = false;
        this.showDialogLeftData = true;
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
    openTest(test) {
        return new Promise((resolve, reject) => {
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
        const query = event.query;
        this.testService.getTest("equipments").then(async (equipments) => {
            this.filteredEquipments = await this.searchEquipments(
                query,
                equipments
            );
        });
    }
    async searchEquipments(query, equipments) {
        return await this.sharedClass.searchTest(
            query,
            equipments,
            "equipmentName"
        );
    }
    getSessionTests() {
        this.spinner.show();
        this.testService
            .getSessionTests(this.selectedSession.id)
            .subscribe((result) => {
                this.rightTests = [];
                this.leftTests = [];
                result.forEach((test) => {
                    this.testService.getTest(test.testId).then(
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
                    if (
                        this.selectedTestData &&
                        this.selectedTestData.length > 0
                    ) {
                        this.selectedTestData[0].id = test.id;
                        this.showSaveButton = false;
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
        } else {
            return false;
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
    showEquipmentDialog(test) {
        this.addEquipmentDialogHeader = `Add Equipment For ${test.testName}`;
        this.selectedTestId = test.id;
        this.displayEquipmentTest = true;
    }
    viewEquipments(test) {
        this.viewEquipmentDialogHeader = `View Equipments Of ${test.testName}`;
        this.testService.getSessionTestEquipment(test.id).subscribe((res) => {
            if (res.length > 0) {
                this.viewedEquipments = res;
                this.showViewEquipments = true;
            }
        });
    }
    resetEquipment() {
        this.showEquipments = true;
        this.filteredEquipments = [];
        this.selectedEquipments = [];
        this.displayEquipmentTest = false;
        this.selectedEquipment = "";
        this.showSaveEquipmentButton = true;
    }
    saveEquipmentsWithoutParams(equipment) {
        this.testService.createTestEquipment(equipment).subscribe((u: any) => {
            this.displayEquipmentTest = false;
            this.resetEquipment();
            this.getSessionTests();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
            this.confirmationService.confirm({
                message: "Do you want to add more equipment?",
                header: "Add Equipment Confirmation",
                icon: "pi pi-info-circle",
                accept: () => {
                    this.testService
                        .getTestById(equipment.sessionTestId)
                        .subscribe((res) => {
                            this.showEquipmentDialog(res);
                        });
                },
                reject: () => {
                    this.showMessageComponent.showMessage(
                        "info",
                        "Rejected",
                        "You have rejected"
                    );
                },
            });
        });
    }
    openEquipment(equipment) {
        this.selectedEquipment = equipment;
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.testService.getTest(equipment.equipmentId).then(
            (res) => {
                this.selectedEquipmentData = res;
                this.showEquipments = false;
            },
            (err) => {
                if (this.showEquipments) {
                    equipment.sessionTestId = this.selectedTestId;
                    this.saveEquipmentsWithoutParams(equipment);
                } else {
                    this.showEquipments = true;
                    return false;
                }
            }
        );
    }
    deleteEquipment(equipment, position) {
        this.position = position;
        this.confirmationService.confirm({
            message: "Do you want to delete this equipment?",
            header: "Delete Equipment Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.testService
                    .deleteTestEquipment(equipment.id)
                    .subscribe((u: any) => {
                        this.viewedEquipments = this.viewedEquipments.filter(
                            (eq) => eq !== equipment
                        );
                        if (this.viewedEquipments.length === 0) {
                            this.showViewEquipments = false;
                        }
                        this.getSessionTests();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Confirmed",
                            "Equipment has been deleted"
                        );
                        this.spinner.hide();
                    });
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
    uploadEquipmentsFiles(id, data, side, type) {
        this.spinner.show();
        let filePath;
        if (this.selectedSession.sessionTypeId === 0) {
            filePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/Equipments/${id}/${type}/${side}`;
        } else {
            filePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/Equipments/${id}/${type}/${side}`;
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
    saveEquipment() {
        this.rightImage = this.equipmentTestParametersComponent.rightImage;
        this.leftImage = this.equipmentTestParametersComponent.leftImage;
        this.rightFiles = this.equipmentTestParametersComponent.rightFiles;
        this.leftFiles = this.equipmentTestParametersComponent.leftFiles;
        this.selectedEquipmentData.forEach((element) => {
            element.equipmentId = this.selectedEquipment.equipmentId;
            element.equipmentName = this.selectedEquipment.equipmentName;
            element.sessionTestId = this.selectedTestId;
        });
        this.spinner.show();
        this.equipmentParameterValueService
            .createEquipmentParametersValues(this.selectedEquipmentData)
            .subscribe((u: any) => {
                if (this.rightImage.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.rightImage,
                        "Right",
                        "Images"
                    );
                }
                if (this.rightFiles.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.rightFiles,
                        "Right",
                        "Files"
                    );
                }
                if (this.leftImage.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.leftImage,
                        "Left",
                        "Images"
                    );
                }
                if (this.leftFiles.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.leftFiles,
                        "Left",
                        "Files"
                    );
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
                this.resetEquipment();
                this.getSessionTests();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
                this.confirmationService.confirm({
                    message: "Do you want to add more equipment?",
                    header: "Add Equipment Confirmation",
                    icon: "pi pi-info-circle",
                    accept: () => {
                        this.testService
                            .getTestById(this.selectedTestId)
                            .subscribe((res) => {
                                this.showEquipmentDialog(res);
                            });
                    },
                    reject: () => {
                        this.showMessageComponent.showMessage(
                            "info",
                            "Rejected",
                            "You have rejected"
                        );
                    },
                });
            });
    }
    async retrieveEquipmentData(equipment) {
        await this.openEquipment(equipment);
        let sessionTest;
        this.testService
            .getTestById(equipment.sessionTestId)
            .subscribe((res) => {
                sessionTest = res;
            });
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.showEquipments = false;
        this.spinner.show();
        this.equipmentParameterValueService
            .getEquipmentParametersValues("equipmentTestId", equipment.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    this.showSaveEquipmentButton = false;
                    this.selectedEquipmentData[0].id = equipment.id;
                    let parameters = this.selectedEquipmentData[0].parameters;
                    if (parameters && parameters.length > 0) {
                        parameters = await this.sharedClass.handleTestData(
                            result,
                            parameters
                        );
                        await this.checkEquipmentForImagesAndFiles(equipment);
                        const found = parameters.some(
                            (param) => param.type === "graph"
                        );
                        if (found) {
                            parameters.forEach((p) => {
                                if (p.type === "table") {
                                    this.testParameterComponent.drawRightGraph(
                                        p.cells
                                    );
                                    this.testParameterComponent.drawLeftGraph(
                                        p.cells
                                    );
                                }
                            });
                        }
                    }
                    this.showEquipmentDialog(sessionTest);
                    this.cdref.detectChanges();
                } else {
                    this.showEquipments = true;
                }
                this.spinner.hide();
            });
    }
    async checkEquipmentForImagesAndFiles(equipment) {
        const found = this.selectedEquipmentData[0].parameters.some(
            (param) => param.type === "image" || param.type === "file"
        );
        if (found) {
            if (this.selectedSession.sessionTypeId === 0) {
                this.rightFilePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                this.savedRightFiles = right.Contents;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                this.savedLeftFiles = left.Contents;
                this.rightImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                this.savedRightImage = rightImage.Contents;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Images/Left`;
                const leftImage = await this.documentService.getAllFiles(
                    this.leftImagePath
                );
                this.savedLeftImage = leftImage.Contents;
            } else {
                this.rightFilePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Files/Right`;
                const right = await this.documentService.getAllFiles(
                    this.rightFilePath
                );
                this.savedRightFiles = right.Contents;
                this.leftFilePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Files/Left`;
                const left = await this.documentService.getAllFiles(
                    this.leftFilePath
                );
                this.savedLeftFiles = left.Contents;
                this.rightImagePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Images/Right`;
                const rightImage = await this.documentService.getAllFiles(
                    this.rightImagePath
                );
                this.savedRightImage = rightImage.Contents;
                this.leftImagePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}/Test/Equipments/${equipment.id}/Images/Left`;
                const leftImage = await this.documentService.getAllFiles(
                    this.leftImagePath
                );
                this.savedLeftImage = leftImage.Contents;
            }
        }
    }
    updateEquipment() {
        this.rightImage = this.equipmentTestParametersComponent.rightImage;
        this.leftImage = this.equipmentTestParametersComponent.leftImage;
        this.rightFiles = this.equipmentTestParametersComponent.rightFiles;
        this.leftFiles = this.equipmentTestParametersComponent.leftFiles;
        this.rightDocument = this.equipmentTestParametersComponent.rightDocument;
        this.leftDocument = this.equipmentTestParametersComponent.leftDocument;
        this.rightDeletedImage = this.equipmentTestParametersComponent.rightDeletedImage;
        this.leftDeletedImage = this.equipmentTestParametersComponent.leftDeletedImage;
        this.selectedEquipmentData.forEach((element) => {
            element.equipmentId = this.selectedEquipment.equipmentId;
            element.equipmentName = this.selectedEquipment.equipmentName;
            element.sessionTestId = this.selectedTestId;
        });
        this.spinner.show();
        this.equipmentParameterValueService
            .updateEquipmentParametersValues(this.selectedEquipmentData)
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
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.rightImage,
                        "Right",
                        "Images"
                    );
                }
                if (this.rightFiles.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.rightFiles,
                        "Right",
                        "Files"
                    );
                }
                if (this.leftImage.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.leftImage,
                        "Left",
                        "Images"
                    );
                }
                if (this.leftFiles.length > 0) {
                    this.uploadEquipmentsFiles(
                        u[0].id,
                        this.leftFiles,
                        "Left",
                        "Files"
                    );
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
                this.resetEquipment();
                this.displayEquipmentTest = false;
                this.showViewEquipments = false;
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data updated successfully"
                );
            });
    }
}
