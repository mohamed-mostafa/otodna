import { NgxSpinnerService } from "ngx-spinner";
import { TeamsService } from "../../demo/service/teamService";
import { Team } from "../../demo/domain/team";
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
    username;
    constructor(
        private teamService: TeamsService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.username = localStorage.getItem("username");
        this.teamService.getTeams().then((teams) => (this.teams = teams));

        this.cols = [
            { field: "id", header: "Id" , width:'5%'},
            { field: "username", header: "Patient Name" , width:'20%'},
            { field: "phone", header: "Phone" , width:'20%'},
            { field: "lastActionDate", header: "Last Action Date" , width:'15%'},
            { field: "lastAction", header: "Last Action" , width:'25%'},
            { field: "team", header: "Team" , width:'15%'},
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
