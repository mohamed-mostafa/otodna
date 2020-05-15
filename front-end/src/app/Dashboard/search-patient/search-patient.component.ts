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
    teamsDropdownList: SelectItem[];
    show = false;
    cols: any[];
    teams: Team[];
    selectedTeam: Team;
    colors: SelectItem[];
    brands: SelectItem[];

    constructor(private teamService: TeamsService) {}

    ngOnInit(): void {
        this.teamService.getTeams().then((teams) => (this.teams = teams));

        this.teamsDropdownList = [
            { label: "Ahmed Mohamed", value: "ahmedMohamed" },
            { label: "Mariem Mohamed", value: "mariemMohamed" },
            { label: "ibrahim Mahmoud", value: "ibrahimMohamoud" },
            { label: "Aya zaki", value: "ayaZaki" },
            { label: "Eslam ahmed", value: "eslamAhmed" },
            { label: "Mostafa ashref", value: "mostafaAshref" },
            { label: "Hend Mahmoud", value: "hendMahmoud" },
            { label: "Tamer Mahmoud", value: "tamerMahmoumd" },
            { label: "Nada ahmed", value: "nadaAhmed" },
            { label: "Salah Abdallah", value: "salahAbdallah" },
        ];
        this.cols = [
            { field: "id", header: "Id" },
            { field: "username", header: "Username" },
            { field: "phone", header: "Phone" },
            { field: "lastActionDate", header: "Last Action Date" },
            { field: "lastAction", header: "Last Action" },
            { field: "team", header: "Team" },
        ];
    }
    showAdvancedSearch() {
        this.show = !this.show;
    }
}
