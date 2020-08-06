import { ParameterValueService } from "./../../services/parameter-value.service";
import { CandidacyService } from "./../services/candidacy.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Candidacy } from "./candidacy";

@Component({
    selector: "app-candidacy",
    templateUrl: "./candidacy.component.html",
    styleUrls: ["./candidacy.component.css"],
    providers: [MessageService],
})
export class CandidacyComponent implements OnInit {
    cols: any[];
    candidacies: any[] = [];
    candidacy: Candidacy = new Candidacy();
    items: MenuItem[];
    home: MenuItem;
    displayTest: boolean;
    showTableFlag = false;
    selectedTest;
    filteredTests: any[];
    allTests = [];
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
    constructor(
        private messageService: MessageService,
        private router: Router,
        private candidacyService: CandidacyService,
        private parameterValueService: ParameterValueService,
        private cdref: ChangeDetectorRef,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.dialogHeader = "Add New Pathology";
        this.candidacy.patientSessionId = this.selectedSession.id;
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label:
                    selectedPatient.firstName + " " + selectedPatient.lastName,
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

        this.showTable();
        this.getAllTests();
        this.getAllCandidacies();
        this.getAllEquipments();
    }
    showTable() {
        if (this.candidacies.length > 0) {
            this.showTableFlag = true;
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
    save() {
        if (this.selectedEquipments && this.selectedEquipments.length > 0) {
            const equipmentsAllData = this.getEquipmentsAllData(
                this.selectedEquipments
            );
            this.selectedTestData.forEach((element) => {
                element.equipments = equipmentsAllData;
            });
        }
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.id;
            element.sessionTreatmentId = this.selectedSession.id;
        });
        this.candidacy.treatmentId = this.selected.id;
        this.candidacy.treatmentName = this.selected.name;
        this.candidacy.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .createParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                this.selectedTest = "";
                this.filteredTests = [];
                this.selectedEquipments = [];
                this.selected = "";
                this.displayTest = false;
                this.candidacy = new Candidacy();
                this.dialogHeader = "Add New Test";
                this.getAllCandidacies();
                this.showTable();
                this.showMessage("success", "Saved", "Data saved successfully");
                this.spinner.hide();
            });
    }
    onHide() {
        this.showTests = true;
        this.filteredTests = [];
        this.selectedTest = "";
        this.selectedEquipments = [];
    }
    cancelTest() {
        this.selectedTest = "";
        this.selected = "";
        this.filteredTests = [];
        this.showTests = true;
        this.displayTest = false;
        this.dialogHeader = "Add New Test";
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
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
    getAllTests() {
        this.candidacyService.getTest("diagnosisCandidacy").then((res) => {
            this.allTests = res;
        });
    }
    filterTest(event) {
        const query = event.query;
        this.candidacyService.getTest("diagnosisCandidacy").then((tests) => {
            this.filteredTests = this.searchTest(query, tests);
        });
    }
    searchTest(query, tests: any[]): any[] {
        const filtered: any[] = [];
        for (const item of tests) {
            const test = item;
            if (test.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(test);
            }
        }
        return filtered;
    }
    getAllEquipments() {
        this.candidacyService.getTest("equipments").then((res) => {
            this.allEquipments = res;
        });
    }
    showTestDialog() {
        this.displayTest = true;
    }
    getAllCandidacies() {
        this.spinner.show();
        this.candidacyService
            .getAllCandidacies(this.selectedSession.id)
            .subscribe((result) => {
                this.candidacies = result;
                this.showTable();
                this.spinner.hide();
            });
    }
    openTest(test) {
        this.selected = test;
        this.getSelectedTest("demo");
        this.showTests = false;
    }
    getSelectedTest(test) {
        this.candidacyService.getTest(test).then((res) => {
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
    retrieveTestData(test) {
        this.showTests = false;
        this.spinner.show();
        this.openTest(test);
        this.candidacyService
            .getSessionTestEquipment(test.id)
            .subscribe((res) => {
                if (res) {
                    res.forEach((element) => {
                        this.selectedEquipments.push(element.equipmentName);
                    });
                }
            });
        this.candidacyService
            .getTestParametersValues(test.id)
            .subscribe((result) => {
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
                                        cell.name === item.subParameterName &&
                                        item.ear === "left"
                                    ) {
                                        if (element.cellType === "boolean") {
                                            cell.left = { name: item.value };
                                        } else {
                                            cell.left = item.value;
                                        }
                                    }
                                    if (
                                        cell.name === item.subParameterName &&
                                        item.ear === "right"
                                    ) {
                                        if (element.cellType === "boolean") {
                                            cell.right = { name: item.value };
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
                this.spinner.hide();
            });
    }
}
