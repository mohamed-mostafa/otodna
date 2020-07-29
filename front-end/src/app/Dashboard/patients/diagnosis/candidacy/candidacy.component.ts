import { CandidacyService } from "./../services/candidacy.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
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
    showTableFlag = false;
    selectedSession;
    allTests = [];
    filteredTests: any[];
    displayTest: boolean;
    selectedTest;

    constructor(
        private messageService: MessageService,
        private router: Router,
        private candidacyService: CandidacyService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
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
    }
    showTable() {
        if (this.candidacies.length > 0) {
            this.showTableFlag = true;
        }
    }
    save(test) {
        this.candidacy.treatmentId = test.id;
        this.candidacy.treatmentName = test.name;
        this.candidacy.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.candidacyService
            .createCandidacy(this.candidacy)
            .subscribe((u: any) => {
                this.candidacies.push(this.candidacy);
                this.candidacy = new Candidacy();
                this.displayTest = false;
                this.selectedTest = "";
                this.filteredTests = [];
                this.getAllCandidacies();
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
    showTestDialog() {
        this.displayTest = true;
    }
    onHide() {
        this.filteredTests = [];
        this.selectedTest = "";
    }
    getAllCandidacies() {
        this.spinner.show();
        this.candidacyService.getAllCandidacies().subscribe((result) => {
            this.candidacies = result;
            this.showTable();
            this.spinner.hide();
        });
    }
}
