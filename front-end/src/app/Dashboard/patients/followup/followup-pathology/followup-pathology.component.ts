import { FollowupPathologyService } from "./../services/followup-pathology.service";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Pathology } from "./pathology";
@Component({
    selector: "app-followup-pathology",
    templateUrl: "./followup-pathology.component.html",
    styleUrls: ["./followup-pathology.component.css"],
    providers: [MessageService],
})
export class FollowupPathologyComponent implements OnInit {
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
        private pathologyService: FollowupPathologyService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.pathology.patientSessionId = this.selectedSession.id;
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
        this.getAllPathologies();
    }
    showTable() {
        if (this.pathologies.length > 0) {
            this.showTableFlag = true;
        }
    }
    save(test) {
        this.pathology.deseaseId = test.id;
        this.pathology.deseaseName = test.name;
        this.pathology.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.pathologyService
            .createPathology(this.pathology)
            .subscribe((u: any) => {
                this.pathology = new Pathology();
                this.displayTest = false;
                this.selectedTest = "";
                this.filteredTests = [];
                this.getAllPathologies();
                this.showTable();
                this.showMessage("success", "Saved", "Data saved successfully");
                this.spinner.hide();
            });
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
        this.pathologyService.getTest("diagnosisPathology").then((res) => {
            this.allTests = res;
        });
    }
    filterTest(event) {
        const query = event.query;
        this.pathologyService.getTest("diagnosisPathology").then((tests) => {
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
    getAllPathologies() {
        this.spinner.show();
        this.pathologyService
            .getAllPathologies(this.selectedSession.id)
            .subscribe((result) => {
                this.pathologies = result;
                this.showTable();
                this.spinner.hide();
            });
    }
}
