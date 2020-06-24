import { AdvancedSearch } from "./advancedSearch";
import { TeamsService } from "./../../services/teams.service";
import { PatientService } from "./../../services/patient.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";

@Component({
    selector: "app-search-patient",
    templateUrl: "./search-patient.component.html",
    styleUrls: ["./search-patient.component.css"],
})
export class SearchPatientComponent implements OnInit {
    show = false;
    show2 = true;
    cols: any[];
    colors: SelectItem[];
    brands: SelectItem[];
    fullName;
    job;
    welcomeTime;
    patients;
    basicSearch;
    advancedSearch: AdvancedSearch = new AdvancedSearch();
    constructor(
        private teamService: TeamsService,
        private spinner: NgxSpinnerService,
        private patientService: PatientService,
        private router: Router
    ) {}

    ngOnInit(): void {
        var today = new Date();
        var curHr = today.getHours();
        if (curHr < 12) {
            this.welcomeTime = "Good Morning";
        } else if (curHr < 18) {
            this.welcomeTime = "Good Afternoon";
        } else {
            this.welcomeTime = "Good Evening";
        }
        let selectedUser = JSON.parse(localStorage.getItem("user"));
        this.fullName = selectedUser.fullName;
        this.job =
            selectedUser.role.name === "None"
                ? selectedUser.type.name
                : selectedUser.role.name;
        this.cols = [
            { field: "id", header: "Id", width: "5%" },
            { field: "username", header: "Patient Name", width: "20%" },
            { field: "mobile", header: "Mobile", width: "20%" },
            {
                field: "lastActionDate",
                header: "Last Modified At",
                width: "15%",
            },
            { field: "lastAction", header: "Last Modified By", width: "25%" },
            { field: "team", header: "Team", width: "15%" },
        ];
        this.getALlPatients();
    }
    showSearch() {
        this.show = !this.show;
        this.show2 = !this.show2;
    }
    search() {
        if (this.basicSearch) {
            this.spinner.show();
            this.patientService
                .searchPatient(this.basicSearch)
                .subscribe((result) => {
                    this.patients = result;
                    this.spinner.hide();
                });
        } else {
            this.getALlPatients();
        }
    }
    editPatient(patient) {
        delete patient.teamName;
        localStorage.setItem("selectedPatient", JSON.stringify(patient));
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
    }
    searchAdvanced() {
        if (
            this.advancedSearch.firstName ||
            this.advancedSearch.lastName ||
            this.advancedSearch.mobile ||
            this.advancedSearch.lastModifiedAt
        ) {
            this.spinner.show();
            this.patientService
                .searchAdvanced(this.advancedSearch)
                .subscribe((result) => {
                    this.patients = result;
                    this.spinner.hide();
                });
        } else {
            this.getALlPatients();
        }
    }
    getALlPatients() {
        this.spinner.show();
        this.patientService.getAllPatients().subscribe((result) => {
            this.patients = result;
            result.forEach((team) => {
                this.teamService.getTeamById(team.teamId).subscribe((res) => {
                    team.teamName = res.name;
                });
            });
            this.spinner.hide();
        });
    }
}
