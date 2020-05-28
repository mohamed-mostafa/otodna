import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-add-followup",
    templateUrl: "./add-followup.component.html",
    styleUrls: ["./add-followup.component.css"],
})
export class AddFollowupComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    constructor() {}

    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            { label: "Patients" },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
            },
            { label: "Add Follow Up" },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
}
