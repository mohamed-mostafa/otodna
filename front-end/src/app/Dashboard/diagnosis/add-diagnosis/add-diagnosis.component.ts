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
            { label: "Add Diagnosis" },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
}
