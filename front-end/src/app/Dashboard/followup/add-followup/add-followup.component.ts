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
        let patientType = localStorage.getItem("patientType");
        if (patientType === "create") {
            this.items = [
                { label: "Patients" },
                { label: "Create Patient" },
                { label: "Add Follow Up" },
            ];
        } else {
            let selectedPatient = JSON.parse(
                localStorage.getItem("selectedPatient")
            );
            this.items = [
                { label: "Patients" },
                { label: selectedPatient.username },
                { label: "Add Follow Up" },
            ];
        }
        this.home = { icon: "fa fa-user-md" };
    }
}
