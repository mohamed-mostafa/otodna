import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-add-treatment",
    templateUrl: "./add-treatment.component.html",
    styleUrls: ["./add-treatment.component.css"],
})
export class AddTreatmentComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    constructor() {}

    ngOnInit(): void {
        let patientType = localStorage.getItem("patientType");
        if (patientType === "create") {
            this.items = [
                { label: "Patients" },
                { label: "Create Patient" },
                { label: "Add Treatment" },
            ];
        } else {
            let selectedPatient = JSON.parse(
                localStorage.getItem("selectedPatient")
            );
            this.items = [
                { label: "Patients" },
                { label: selectedPatient.username },
                { label: "Add Treatment" },
            ];
        }
        this.home = { icon: "fa fa-user-md" };
    }
}
