import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Test } from "./test";
import { TestsService } from "../services/tests.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-tests",
    templateUrl: "./tests.component.html",
    styleUrls: ["./tests.component.css"],
    providers: [MessageService],
})
export class TestsComponent implements OnInit {
    myFormGroup: FormGroup;
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
    selectedEquipments;
    filteredEquipments: any[];
    constructor(
        private messageService: MessageService,
        private testService: TestsService,
        private router: Router,
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
            { field: "id", header: "ID", width: "20%" },
            { field: "name", header: "Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };

        this.showTable();
        this.getAllTests();
        this.getAllEquipments();
    }
    showTable() {
        if (this.tests.length > 0) {
            this.showTableFlag = true;
        }
    }
    saveTest() {
        console.log(this.myFormGroup.value);
        console.log(this.selectedEquipments);

        this.test.id = this.selected.id;
        this.test.name = this.selected.name;
        this.spinner.show();
        setTimeout(() => {
            this.tests.push(this.test);
            this.selectedTest = "";
            this.filteredTests = [];
            this.selected = "";
            this.showTests = true;
            this.displayTest = false;
            this.test = new Test();
            this.selectedEquipments = "";
            this.dialogHeader = "Add New Test";
            this.showTable();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
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
    openTest(test) {
        this.selected = test;
        if (
            test.id === "E01.370.382.375.050" ||
            test.id === "E01.370.382.375.060.060" ||
            test.id === "E01.370.382.375.060.055"
        ) {
            this.getSelectedTest(test.id);
        } else {
            this.getSelectedTest("demo");
        }
        this.showTests = false;
    }
    getSelectedTest(test) {
        this.testService.getTest(test).then((res) => {
            this.selectedTestData = res;
            this.dialogHeader = res.map((r) => r.name);
            let group = {};
            res.forEach((r) => {
                r.parameters.forEach((element) => {
                    group[element.textareaVal] = new FormControl("");
                    group[element.leftVal] = element.required
                        ? new FormControl("", {
                              validators: Validators.required,
                          })
                        : new FormControl("");
                    group[element.rightVal] = element.required
                        ? new FormControl("", {
                              validators: Validators.required,
                          })
                        : new FormControl("");
                });
            });
            this.myFormGroup = new FormGroup(group);
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
}
