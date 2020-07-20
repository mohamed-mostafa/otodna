import { Equipment } from "./equipment";
import { Router } from "@angular/router";
import { Acoustic } from "./acoustic";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
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
    showTests = true;
    selected;
    acousticTest = [];
    uploadedFiles: any[] = [];
    uploadedImages: any[] = [];
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
            { label: "Diagnosis" },
        ];
        this.cols = [
            { field: "id", header: "ID", width: "10%" },
            { field: "name", header: "Name", width: "90%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };

        this.showTable();
        this.getAllTests();
        this.getAcousticTest();
    }
    showTable() {
        if (this.tests.length > 0) {
            this.showTableFlag = true;
        }
    }
    saveTest() {
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
    openTest(test) {
        this.selected = test;
        this.showTests = false;
    }
    getAcousticTest() {
        this.testService.getTest("acousticTest").then((res) => {
            this.acousticTest = res;
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
}
