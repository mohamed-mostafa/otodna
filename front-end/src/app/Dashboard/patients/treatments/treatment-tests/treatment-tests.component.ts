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
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    treatments: any[] = [];
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
    constructor(
        private messageService: MessageService,
        private treatmentService: TreatmentTestsService,
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
    filterTreatment(event) {
        const query = event.query;
        this.treatmentService
            .getTreatmentTest("treatmentTests")
            .then(async (treatments) => {
                this.filteredTreatments = await this.searchTreatment(
                    query,
                    treatments
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
    getAllTreatments() {
        if (this.selectedPatient.teamId === 0) {
            this.treatmentService
                .getTreatmentTest("treatmentTests")
                .then((res) => {
                    this.allTreatments = res;
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
                this.treatmentService
                    .getTreatmentTest("treatmentTests")
                    .then((res) => {
                        for (const r of res) {
                            for (const dep of r.departments) {
                                if (dep.id === id) {
                                    this.allTreatments.push(r);
                                }
                            }
                        }
                    });
            });
        }
    }
    getAllEquipments() {
        this.treatmentService.getTreatmentTest("equipments").then((res) => {
            this.allEquipments = res;
        });
    }
    async openTest(treatment) {
        this.selected = treatment;
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.treatmentService.getTreatmentTest(treatment.treatmentId).then(
            (res) => {
                this.selectedTestData = res;
                this.showTests = false;
                this.dialogHeader = res.map((r) => r.name);
            },
            (err) => {
                if (this.showTests) {
                    treatment.patientSessionId = this.selectedSession.id;
                    this.saveWithoutParams(treatment);
                } else {
                    this.showTests = true;
                    return false;
                }
            }
        );
    }
    saveWithoutParams(treatment) {
        delete treatment.departments;
        this.treatmentService.createTreatment(treatment).subscribe((u: any) => {
            this.reset();
            this.getSessionTreatments();
            this.showMessageComponent.showMessage(
                "success",
                "Saved",
                "Data saved successfully"
            );
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
        this.filteredEquipments = [];
        for (const item of this.allEquipments) {
            const brand = item.name;
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredEquipments.push(brand);
            }
        }
    }
    getSessionTreatments() {
        this.spinner.show();
        this.treatmentService
            .getSessionTreatments(this.selectedSession.id)
            .subscribe((result) => {
                this.treatments = result;
                this.spinner.hide();
            });
    }
    async retrieveTestData(treatment) {
        await this.openTest(treatment);
        this.savedRightFiles = [];
        this.savedLeftFiles = [];
        this.savedLeftImage = [];
        this.savedRightImage = [];
        this.showTests = false;
        this.spinner.show();
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
                    this.showSaveButton = false;
                    this.selectedTestData[0].id = treatment.id;
                    let parameters = this.selectedTestData[0].parameters;
                    if (parameters && parameters.length > 0) {
                        parameters = await this.sharedClass.handleTestData(
                            result,
                            parameters
                        );
                        await this.checkForImagesAndFiles(treatment);
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
                    this.displayTest = true;
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
            this.rightImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Treatment/${treatment.id}/Images/Right`;
            const rightImage = await this.documentService.getAllFiles(
                this.rightImagePath
            );
            this.savedRightImage = rightImage.Contents;
            this.leftImagePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}/Treatment/${treatment.id}/Images/Left`;
            const leftImage = await this.documentService.getAllFiles(
                this.leftImagePath
            );
            this.savedLeftImage = leftImage.Contents;
        }
    }
    endSession() {
        this.sharedClass.endSession(this.router.url, this.router);
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
