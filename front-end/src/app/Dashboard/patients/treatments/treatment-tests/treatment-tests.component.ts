import { SearchResultItemComponent } from "./../../shared/item-search/search-result-item/search-result-item.component";
import { FrequentlyUsedComponent } from "./../../shared/frequently-used/frequently-used.component";
import { PatientService } from "./../../services/patient.service";
import { EquipmentParameterValueService } from "./../../services/equipment-parameter-value.service";
import { EquipmentTestParametersComponent } from "./../../shared/equipment-test-parameters/equipment-test-parameters.component";
import { TestParametersComponent } from "./../../shared/test-parameters/test-parameters.component";
import { SharedClass } from "../../shared/sharedFunctions";
import { DocumentsService } from "./../../../services/documents.service";
import { TeamsService } from "./../../../services/teams.service";
import { TreatmentTestsService } from "./../services/treatment-tests.service";
import { ParameterValueService } from "./../../services/parameter-value.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Treatment } from "./treatment";
import { ShowMessageComponent } from "../../../shared/show-message/show-message.component";
@Component({
    selector: "app-treatment-tests",
    templateUrl: "./treatment-tests.component.html",
    styleUrls: ["./treatment-tests.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class TreatmentTestsComponent implements OnInit {
    @ViewChild(TestParametersComponent) testParameterComponent;
    @ViewChild(EquipmentTestParametersComponent)
    equipmentTestParametersComponent;
    @ViewChild(FrequentlyUsedComponent) frequentlyUsedComponent;
    @ViewChild(SearchResultItemComponent) searchResultItemComponent;
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    rightTreatments: any[] = [];
    leftTreatments: any[] = [];
    treatment: Treatment = new Treatment();
    items: MenuItem[];
    home: MenuItem;
    displayTest: boolean;
    selectedTreatment;
    filteredTreatments: any[];
    allTreatments = [];
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
    selectedTreatmentId;
    showViewEquipments = false;
    viewedEquipments = [];
    position;
    selectedEquipmentData = [];
    showSaveEquipmentButton = true;
    addEquipmentDialogHeader;
    viewEquipmentDialogHeader;
    showDialogRightData = true;
    showDialogLeftData = true;
    cogsItems = [];
    ear;
    treatmentBreadCrumb = [];
    readonly = false;
    constructor(
        private messageService: MessageService,
        private treatmentService: TreatmentTestsService,
        private parameterValueService: ParameterValueService,
        private equipmentParameterValueService: EquipmentParameterValueService,
        private router: Router,
        private cdref: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private teamsService: TeamsService,
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
        this.dialogHeader = "Add New Treatment";
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
                        : "This Session Is Ended",
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
        this.treatmentBreadCrumb = [
            {
                label: "Treatments",
                command: () => {
                    this.reset();
                },
            },
        ];
        this.cols = [
            { field: "treatmentId", header: "Treatment ID", width: "20%" },
            { field: "treatmentName", header: "Treatment Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.getAllTreatments();
        this.getAllEquipments();
        this.getSessionTreatments();
        this.checkLoggedInUserTeamWithPatient();
    }
    showSavedTreatments() {
        this.displayTest = false;
    }
    showSearchTreatments() {
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
    onClickMenu(data: any) {
        this.cogsItems = [
            {
                label: "Delete Test",
                icon: "fa fa-trash-o",
                command: () => {
                    this.deleteTreatment(data);
                },
            },
            {
                label: "Add Equipment",
                icon: "fa fa-plus",
                command: () => {
                    this.showEquipmentDialog(data);
                },
                disabled: !data.showEquipment,
            },
            {
                label: "view Equipment",
                icon: "fa fa-desktop",
                command: () => {
                    this.viewEquipments(data);
                },
                disabled: !data.showEquipment || data.equipmentCount < 1,
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
        let filePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/${id}/${type}/${side}`;
        this.documentService.fileUpload(data, filePath).then((data) => {
            this.spinner.hide();
            if (side === "Right") {
                this.rightFiles.splice(0, this.rightFiles.length);
            } else {
                this.leftFiles.splice(0, this.leftFiles.length);
            }
        });
    }
    saveTreatment() {
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
            } else {
                element.ear = this.ear;
            }
            element.testId = this.selected.treatmentId;
            element.sessionTreatmentId = this.selectedSession.id;
        });
        this.treatment.treatmentId = this.selected.treatmentId;
        this.treatment.treatmentName = this.selected.treatmentName;
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
                this.getSessionTreatments();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data saved successfully"
                );
                this.confirmationService.confirm({
                    message: "Do you want to add equipment for this treatment?",
                    header: "Add Equipment Confirmation",
                    icon: "pi pi-info-circle",
                    accept: () => {
                        this.treatmentService
                            .getTreatmentById(u[0].id)
                            .subscribe((res) => {
                                this.showEquipmentDialog(res);
                            });
                    },
                });
            });
    }
    updateTreatment() {
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
            element.testId = this.selected.treatmentId;
            element.sessionTreatmentId = this.selectedSession.id;
        });
        this.treatment.treatmentId = this.selected.treatmentId;
        this.treatment.treatmentName = this.selected.treatmentName;
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
                this.getSessionTreatments();
                this.showMessageComponent.showMessage(
                    "success",
                    "Saved",
                    "Data updated successfully"
                );
            });
    }
    reset() {
        // this.searchResultItemComponent.reset();
        this.selectedTreatment = "";
        this.selected = "";
        this.filteredTreatments = [];
        this.showTests = true;
        this.displayTest = false;
        this.selectedEquipments = [];
        this.showSaveButton = true;
        this.rightDocument = "";
        this.leftDocument = "";
        this.treatment = new Treatment();
        this.dialogHeader = "Add New Treatment";
        this.treatmentBreadCrumb = [
            {
                label: "Treatments",
                command: () => {
                    this.reset();
                },
            },
        ];
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
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    async filterTreatment(event) {
        const query = event.query;
        this.documentService
            .getAllTests("treatmentTests")
            .then(async (treatments) => {
                this.filteredTreatments = await this.searchTreatment(
                    query,
                    treatments
                );
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
            });
    }
    async searchTreatment(query, treatments) {
        return await this.sharedClass.searchTest(
            query,
            treatments,
            "treatmentName"
        );
    }
    async getAllTreatments() {
        this.spinner.show();
        const id = this.selectedSession.departmentId;
        this.documentService
            .getAllTests("treatmentTests")
            .then((result) => {
                for (const r of result) {
                    for (const dep of r.departments) {
                        if (dep.id === id) {
                            this.allTreatments.push(r);
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
    getAllEquipments() {
        this.documentService
            .getAllTests("equipments")
            .then((result) => {
                this.allEquipments = result;
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
            });
    }
    selectFrequentlyUsed(event) {
        this.openTest(event);
    }
    receiveTest(event) {
        this.openTest(event);
    }
    openTest(treatment) {
        return new Promise(async (resolve, reject) => {
            this.selected = treatment;
            this.savedRightFiles = [];
            this.savedLeftFiles = [];
            this.savedLeftImage = [];
            this.savedRightImage = [];
            const result = await this.documentService
                .getAllTests(treatment.treatmentId)
                .catch((error) => {
                    if (this.showTests) {
                        treatment.patientSessionId = this.selectedSession.id;
                        this.saveWithoutParams(treatment);
                        resolve();
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
                this.treatmentBreadCrumb = [
                    {
                        label: "Treatments",
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
            }
        });
    }
    saveWithoutParams(treatment) {
        delete treatment.departments;
        treatment.ear = this.ear;
        this.treatmentService.createTreatment(treatment).subscribe((u: any) => {
            this.reset();
            this.getSessionTreatments();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
            this.searchResultItemComponent.reset();
            this.spinner.hide();
        });
    }
    getSelectedTest(treatment) {
        this.treatmentService.getTreatmentTest(treatment).then((res) => {
            this.selectedTestData = res;
            this.dialogHeader = res.map((r) => r.name);
        });
    }
    filterEquipments(event) {
        const query = event.query;
        this.documentService
            .getAllTests("equipments")
            .then(async (equipments) => {
                this.filteredEquipments = await this.searchEquipments(
                    query,
                    equipments
                );
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
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
    getSessionTreatments() {
        this.spinner.show();
        this.treatmentService
            .getSessionTreatments(this.selectedSession.id)
            .subscribe((result) => {
                this.rightTreatments = [];
                this.leftTreatments = [];
                result.forEach((treatment) => {
                    this.documentService
                        .getAllTests(treatment.treatmentId)
                        .then(
                            (res) => {
                                treatment.showEquipment = true;
                                this.treatmentService
                                    .getTreatmentEquipmentCount(treatment.id)
                                    .subscribe(async (result) => {
                                        treatment.equipmentCount = result.count;
                                    });
                            },
                            (err) => {
                                treatment.showEquipment = false;
                            }
                        );
                    if (treatment.ear === "R") {
                        this.rightTreatments.push(treatment);
                    }
                    if (treatment.ear === "L") {
                        this.leftTreatments.push(treatment);
                    }
                    if (treatment.ear === "BOTH") {
                        this.rightTreatments.push(treatment);
                        this.leftTreatments.push(treatment);
                    }
                });
                // this.frequentlyUsedComponent.getFrequentlyUsed();
                this.spinner.hide();
            });
    }
    async retrieveTestData(treatment, position) {
        this.spinner.show();
        if (this.selectedSession.ended === "false") {
            this.readonly = false;
        } else {
            this.readonly = true;
        }
        if (position === "right") {
            this.showDialogLeftData = false;
            this.showDialogRightData = true;
            this.ear = "R";
        } else {
            this.showDialogRightData = false;
            this.showDialogLeftData = true;
            this.ear = "L";
        }
        await this.openTest(treatment);
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.showTests = true;
        this.treatmentService
            .getSessionTreatmentEquipment(treatment.id)
            .subscribe((res) => {
                if (res && res.length > 0) {
                    this.showSaveButton = false;
                    this.selectedTestData[0].id = treatment.id;
                    res.forEach((element) => {
                        this.selectedEquipments.push(element.equipmentName);
                    });
                }
            });
        this.treatmentService
            .getTestParametersValues(treatment.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    if (
                        this.selectedTestData &&
                        this.selectedTestData.length > 0
                    ) {
                        this.showSaveButton = false;
                        this.selectedTestData[0].id = treatment.id;
                        let parameters = this.selectedTestData[0].parameters;
                        if (parameters && parameters.length > 0) {
                            parameters = await this.sharedClass.handleTestData(
                                result,
                                parameters
                            );
                            await this.checkForImagesAndFiles(treatment);
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
    async checkForImagesAndFiles(treatment) {
        const found = this.selectedTestData[0].parameters.some(
            (param) => param.type === "image" || param.type === "file"
        );
        if (found) {
            this.rightFilePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/${treatment.id}/Files/Right`;
            const right = await this.documentService.getAllFiles(
                this.rightFilePath
            );
            this.savedRightFiles = right.Contents;
            this.leftFilePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/${treatment.id}/Files/Left`;
            const left = await this.documentService.getAllFiles(
                this.leftFilePath
            );
            this.savedLeftFiles = left.Contents;
            this.rightImagePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/${treatment.id}/Images/Right`;
            const rightImage = await this.documentService.getAllFiles(
                this.rightImagePath
            );
            this.savedRightImage = rightImage.Contents;
            this.leftImagePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/${treatment.id}/Images/Left`;
            const leftImage = await this.documentService.getAllFiles(
                this.leftImagePath
            );
            this.savedLeftImage = leftImage.Contents;
        }
    }
    endSession() {
        if (this.selectedSession.ended === "false") {
            this.sharedClass.endSession(this.router.url, this.router);
        }
    }
    deleteTreatment(data) {
        this.confirmationService.confirm({
            message: "Do you want to delete this treatment?",
            header: "Delete Treatment Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.treatmentService
                    .deleteTreatment(data.id)
                    .subscribe((u: any) => {
                        this.getSessionTreatments();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Treatment has been deleted"
                );
            },
        });
    }
    showEquipmentDialog(treatment) {
        this.addEquipmentDialogHeader = `Add Equipment For ${treatment.treatmentName}`;
        this.selectedTreatmentId = treatment.id;
        this.displayEquipmentTest = true;
    }
    viewEquipments(treatment) {
        this.viewEquipmentDialogHeader = `View Equipments Of ${treatment.treatmentName}`;
        this.treatmentService
            .getSessionTreatmentEquipment(treatment.id)
            .subscribe((res) => {
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
        this.treatmentService
            .createTreatmentEquipment(equipment)
            .subscribe((u: any) => {
                this.displayEquipmentTest = false;
                this.resetEquipment();
                this.getSessionTreatments();
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
                        this.treatmentService
                            .getTreatmentById(equipment.sessionTreatmentId)
                            .subscribe((res) => {
                                this.showEquipmentDialog(res);
                            });
                    },
                });
            });
    }
    async openEquipment(equipment) {
        this.selectedEquipment = equipment;
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        const result = await this.documentService
            .getAllTests(equipment.equipmentId)
            .catch((error) => {
                if (this.showEquipments) {
                    equipment.sessionTreatmentId = this.selectedTreatmentId;
                    this.saveEquipmentsWithoutParams(equipment);
                } else {
                    this.showEquipments = true;
                    return false;
                }
            });
        if (result) {
            this.selectedEquipmentData = result;
            this.showEquipments = false;
        }
    }
    deleteEquipment(equipment, position) {
        this.position = position;
        this.confirmationService.confirm({
            message: "Do you want to delete this equipment?",
            header: "Delete Equipment Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.treatmentService
                    .deleteTreatmentEquipment(equipment.id)
                    .subscribe((u: any) => {
                        this.viewedEquipments = this.viewedEquipments.filter(
                            (eq) => eq !== equipment
                        );
                        if (this.viewedEquipments.length === 0) {
                            this.showViewEquipments = false;
                        }
                        this.getSessionTreatments();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Confirmed",
                            "Equipment has been deleted"
                        );
                        this.spinner.hide();
                    });
            },
        });
    }
    uploadEquipmentsFiles(id, data, side, type) {
        this.spinner.show();
        let filePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/Equipments/${id}/${type}/${side}`;
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
            element.sessionTreatmentId = this.selectedTreatmentId;
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
                this.getSessionTreatments();
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
                        this.treatmentService
                            .getTreatmentById(this.selectedTreatmentId)
                            .subscribe((res) => {
                                this.showEquipmentDialog(res);
                            });
                    },
                });
            });
    }
    async retrieveEquipmentData(equipment) {
        let sessionTreatment;
        this.treatmentService
            .getTreatmentById(equipment.sessionTreatmentId)
            .subscribe((res) => {
                sessionTreatment = res;
            });
        await this.openEquipment(equipment);
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.showEquipments = false;
        this.spinner.show();
        this.equipmentParameterValueService
            .getEquipmentParametersValues("equipmentTreatmentId", equipment.id)
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
                    this.showEquipmentDialog(sessionTreatment);
                    this.cdref.detectChanges();
                } else {
                    this.showTests = true;
                }
                this.spinner.hide();
            });
    }
    async checkEquipmentForImagesAndFiles(equipment) {
        const found = this.selectedEquipmentData[0].parameters.some(
            (param) => param.type === "image" || param.type === "file"
        );
        if (found) {
            this.rightFilePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/Equipments/${equipment.id}/Files/Right`;
            const right = await this.documentService.getAllFiles(
                this.rightFilePath
            );
            this.savedRightFiles = right.Contents;
            this.leftFilePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/Equipments/${equipment.id}/Files/Left`;
            const left = await this.documentService.getAllFiles(
                this.leftFilePath
            );
            this.savedLeftFiles = left.Contents;
            this.rightImagePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/Equipments/${equipment.id}/Images/Right`;
            const rightImage = await this.documentService.getAllFiles(
                this.rightImagePath
            );
            this.savedRightImage = rightImage.Contents;
            this.leftImagePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}/Treatment/Equipments/${equipment.id}/Images/Left`;
            const leftImage = await this.documentService.getAllFiles(
                this.leftImagePath
            );
            this.savedLeftImage = leftImage.Contents;
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
            element.sessionTreatmentId = this.selectedTreatmentId;
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
                this.getSessionTreatments();
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
