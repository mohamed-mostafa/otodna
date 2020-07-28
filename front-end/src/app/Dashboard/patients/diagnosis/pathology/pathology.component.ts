import { TestsService } from "./../services/tests.service";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Pathology } from "./pathology";

@Component({
    selector: "app-pathology",
    templateUrl: "./pathology.component.html",
    styleUrls: ["./pathology.component.css"],
    providers: [MessageService],
})
export class PathologyComponent implements OnInit {
    cols: any[];
    pathologies: any[] = [];
    pathology: Pathology = new Pathology();
    items: MenuItem[];
    home: MenuItem;
    showTableFlag = false;
    selectedSession;
    allTests = [];
    filteredTests: any[];
    displayTest: boolean;
    selectedTest;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private testService: TestsService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
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
            { label: this.selectedSession.displayName },
        ];
        this.cols = [
            { field: "id", header: "ID", width: "20%" },
            { field: "name", header: "Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };

        this.showTable();
        this.getAllTests();
    }
    showTable() {
        if (this.pathologies.length > 0) {
            this.showTableFlag = true;
        }
    }
    save(test) {
        this.pathology.id = test.id;
        this.pathology.name = test.name;
        this.spinner.show();
        setTimeout(() => {
            this.pathologies.push(this.pathology);
            this.pathology = new Pathology();
            this.displayTest = false;
            this.selectedTest = "";
            this.filteredTests = [];
            this.showTable();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
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
        this.testService.getTest("diagnosisPathology").then((res) => {
            this.allTests = res;
        });
    }
    filterTest(event) {
        const query = event.query;
        this.testService.getTest("diagnosisPathology").then((tests) => {
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
    showTestDialog() {
        this.displayTest = true;
    }
    onHide() {
        this.filteredTests = [];
        this.selectedTest = "";
    }
}
