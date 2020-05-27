import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-add-diagnosis",
    templateUrl: "./add-diagnosis.component.html",
    styleUrls: ["./add-diagnosis.component.css"],
})
export class AddDiagnosisComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    constructor() {}

    ngOnInit(): void {
        let patientType = localStorage.getItem("patientType");
        if (patientType === "create") {
            this.items = [
                { label: "Patients" },
                { label: "Create Patient" },
                { label: "Add Diagnosis" },
            ];
        } else {
            let selectedPatient = JSON.parse(
                localStorage.getItem("selectedPatient")
            );
            this.items = [
                { label: "Patients" },
                { label: selectedPatient.username },
                { label: "Add Diagnosis" },
            ];
        }
        this.home = { icon: "fa fa-user-md" };
    }
}
