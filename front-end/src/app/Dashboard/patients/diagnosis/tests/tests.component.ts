import { ParameterValueService } from "./../../services/parameter-value.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Test } from "./test";
import { TestsService } from "../services/tests.service";

@Component({
    selector: "app-tests",
    templateUrl: "./tests.component.html",
    styleUrls: ["./tests.component.css"],
    providers: [MessageService],
})
export class TestsComponent implements OnInit {
    cols: any[];
    tests: any[] = [];
    test: Test = new Test();
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
        private testService: TestsService,
        private parameterValueService: ParameterValueService,
        private router: Router,
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
                    selectedPatient.firstName + " " + selectedPatient.lastName,
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
        this.showTable();
        this.getAllTests();
        this.getAllEquipments();
        this.getSessionTests();
    }
    showTable() {
        if (this.tests.length > 0) {
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
    saveTest() {
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
                this.selectedTest = "";
                this.filteredTests = [];
                this.selectedEquipments = [];
                this.selected = "";
                this.displayTest = false;
                this.test = new Test();
                this.dialogHeader = "Add New Test";
                this.getSessionTests();
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
    filterTest(event) {
        const query = event.query;
        this.testService.getTest("diagnosisTests").then((tests) => {
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
    getAllTests() {
        this.testService.getTest("diagnosisTests").then((res) => {
            this.allTests = res;
        });
    }
    getAllEquipments() {
        this.testService.getTest("equipments").then((res) => {
            this.allEquipments = res;
        });
    }
    async openTest(test) {
        this.selected = test;
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
        this.testService.createSessionTest(test).subscribe((u: any) => {
            this.selectedTest = "";
            this.filteredTests = [];
            this.selectedEquipments = [];
            this.selected = "";
            this.displayTest = false;
            this.test = new Test();
            this.dialogHeader = "Add New Test";
            this.getSessionTests();
            this.showTable();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
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
    getSessionTests() {
        this.spinner.show();
        this.testService
            .getSessionTests(this.selectedSession.id)
            .subscribe((result) => {
                this.tests = result;
                this.showTable();
                this.spinner.hide();
            });
    }
    async retrieveTestData(test) {
        await this.openTest(test);
        this.showTests = false;
        this.spinner.show();
        this.testService.getSessionTestEquipment(test.id).subscribe((res) => {
            if (res && res.length > 0) {
                res.forEach((element) => {
                    this.selectedEquipments.push(element.equipmentName);
                });
            }
        });
        this.testService
            .getTestParametersValues(test.id)
            .subscribe((result) => {
                if (result && result.length > 0) {
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
}
