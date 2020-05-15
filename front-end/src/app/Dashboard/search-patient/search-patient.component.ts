import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";

@Component({
    selector: "app-search-patient",
    templateUrl: "./search-patient.component.html",
    styleUrls: ["./search-patient.component.css"],
})
export class SearchPatientComponent implements OnInit {
    teams: SelectItem[];
    show = false;
    constructor() {}

    ngOnInit(): void {
        this.teams = [
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
    }
    showAdvancedSearch() {
        this.show = !this.show;
    }
}
