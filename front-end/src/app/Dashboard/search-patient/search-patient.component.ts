import { NgxSpinnerService } from "ngx-spinner";
import { TeamsService } from "./../demo/service/teamService";
import { Team } from "./../demo/domain/team";
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
    teams: Team[];
    selectedTeam: Team;
    colors: SelectItem[];
    brands: SelectItem[];

    constructor(
        private teamService: TeamsService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.teamService.getTeams().then((teams) => (this.teams = teams));

        this.cols = [
            { field: "id", header: "Id" },
            { field: "username", header: "Username" },
            { field: "phone", header: "Phone" },
            { field: "lastActionDate", header: "Last Action Date" },
            { field: "lastAction", header: "Last Action" },
            { field: "team", header: "Team" },
        ];
    }
    showSearch() {
        this.show = !this.show;
        this.show2 = !this.show2;
    }
    search() {
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 2000);
    }
}
