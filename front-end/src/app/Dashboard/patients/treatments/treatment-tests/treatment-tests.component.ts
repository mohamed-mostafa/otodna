import { TeamsService } from "./../../../services/teams.service";
import { TreatmentTestsService } from "./../services/treatment-tests.service";
import { ParameterValueService } from "./../../services/parameter-value.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Treatment } from "./treatment";

@Component({
    selector: "app-treatment-tests",
    templateUrl: "./treatment-tests.component.html",
    styleUrls: ["./treatment-tests.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class TreatmentTestsComponent implements OnInit {
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
    uploadedFiles: any[] = [];
    uploadedImages: any[] = [];
    selectedSession;
    dialogHeader;
    filteredEquipments: any[];
    selectedEquipments = [];
    showSaveButton = true;
    showAllButtons = true;
    selectedPatient;
    constructor(
        private messageService: MessageService,
        private treatmentService: TreatmentTestsService,
        private parameterValueService: ParameterValueService,
        private router: Router,
        private cdref: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private teamsService: TeamsService,
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
    checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        if (LoggedInUser.teams.length > 0) {
            const found = LoggedInUser.teams.some(
                (team) => team.id === this.selectedPatient.teamId
            );
            if (found) {
                this.showAllButtons = true;
            } else {
                this.showAllButtons = false;
            }
        }
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
    saveTreatment() {
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
                this.selectedTreatment = "";
                this.filteredTreatments = [];
                this.selectedEquipments = [];
                this.selected = "";
                this.displayTest = false;
                this.treatment = new Treatment();
                this.dialogHeader = "Add New Treatment";
                this.getSessionTreatments();
                this.showMessage("success", "Saved", "Data saved successfully");
                this.spinner.hide();
            });
    }
    updateTreatment() {
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
                this.selectedTreatment = "";
                this.filteredTreatments = [];
                this.selectedEquipments = [];
                this.selected = "";
                this.displayTest = false;
                this.treatment = new Treatment();
                this.dialogHeader = "Add New Treatment";
                this.getSessionTreatments();
                this.showMessage(
                    "success",
                    "Saved",
                    "Data updated successfully"
                );
                this.spinner.hide();
            });
    }
    onHide() {
        this.showTests = true;
        this.filteredTreatments = [];
        this.selectedTreatment = "";
        this.selectedEquipments = [];
        this.showSaveButton = true;
    }
    cancelTreatment() {
        this.selectedTreatment = "";
        this.selected = "";
        this.filteredTreatments = [];
        this.showTests = true;
        this.displayTest = false;
        this.dialogHeader = "Add New Treatment";
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    showTestDialog() {
        this.displayTest = true;
    }
    goToPatientPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
    }
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
    filterTreatment(event) {
        console.log(event);
        const query = event.query;
        this.treatmentService
            .getTreatmentTest("treatmentTests")
            .then((treatments) => {
                this.filteredTreatments = this.searchTreatment(
                    query,
                    treatments
                );
            });
    }
    searchTreatment(query, treatments: any[]): any[] {
        const filtered: any[] = [];
        for (const item of treatments) {
            if (
                item.treatmentName
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) === 0
            ) {
                filtered.push(item);
            }
        }
        return filtered;
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
            this.selectedTreatment = "";
            this.filteredTreatments = [];
            this.selectedEquipments = [];
            this.selected = "";
            this.displayTest = false;
            this.treatment = new Treatment();
            this.dialogHeader = "Add New Treatment";
            this.getSessionTreatments();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        });
    }
    getSelectedTest(treatment) {
        this.treatmentService.getTreatmentTest(treatment).then((res) => {
            this.selectedTestData = res;
            this.dialogHeader = res.map((r) => r.name);
        });
    }
    uploadImages(event) {
        for (const file of event.files) {
            this.uploadedImages.push(file);
        }
        this.showMessage("info", "Success", "Upload Completed");
    }
    uploadFiles(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.showMessage("info", "Success", "Upload Completed");
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
    customTrackBy(index: number, obj: any): any {
        return index;
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
            .subscribe((result) => {
                if (result && result.length > 0) {
                    this.showSaveButton = false;
                    this.selectedTestData[0].id = treatment.id;
                    const parameters = this.selectedTestData[0].parameters;
                    if (parameters && parameters.length > 0) {
                        for (const element of parameters) {
                            for (const item of result) {
                                if (
                                    element.name === item.parameterName &&
                                    element.type === "table"
                                ) {
                                    for (const cell of element.cells) {
                                        if (
                                            cell.name ===
                                                item.subParameterName &&
                                            item.ear === "left"
                                        ) {
                                            if (
                                                element.cellType === "boolean"
                                            ) {
                                                cell.left = {
                                                    name: item.value,
                                                };
                                            } else {
                                                cell.left = item.value;
                                            }
                                        }
                                        if (
                                            cell.name ===
                                                item.subParameterName &&
                                            item.ear === "right"
                                        ) {
                                            if (
                                                element.cellType === "boolean"
                                            ) {
                                                cell.right = {
                                                    name: item.value,
                                                };
                                            } else {
                                                cell.right = item.value;
                                            }
                                        }
                                    }
                                }
                                if (
                                    element.name === item.parameterName &&
                                    element.type === "textarea"
                                ) {
                                    element.textareaVal = item.value;
                                }
                                if (
                                    element.name === item.parameterName &&
                                    element.type === "list"
                                ) {
                                    if (item.ear === "left") {
                                        const found = element.values.filter(
                                            (val) => val.name === item.value
                                        );
                                        element.leftVal = found[0];
                                    }
                                    if (item.ear === "right") {
                                        const found = element.values.filter(
                                            (val) => val.name === item.value
                                        );
                                        element.rightVal = found[0];
                                    }
                                }
                                if (
                                    element.type === "text" ||
                                    element.type === "number" ||
                                    element.type === "boolean"
                                ) {
                                    if (
                                        element.name === item.parameterName &&
                                        item.ear === "left"
                                    ) {
                                        element.leftVal = item.value;
                                    }
                                    if (
                                        element.name === item.parameterName &&
                                        item.ear === "right"
                                    ) {
                                        element.rightVal = item.value;
                                    }
                                }
                            }
                        }
                    }
                    this.displayTest = true;
                    this.cdref.detectChanges();
                }
                this.spinner.hide();
            });
    }
    endSession() {
        this.router
            .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true,
            })
            .then(() => {
                this.router.navigate(["/dashboard/addTreatment"]);
            });
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
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Treatment has been deleted"
                );
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
}
