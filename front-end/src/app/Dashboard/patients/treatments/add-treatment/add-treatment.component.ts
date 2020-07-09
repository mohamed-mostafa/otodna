import { Router } from "@angular/router";
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
    constructor(private router: Router) {}

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
                command: (event) => {
                    this.goToPatientPage(event);
                },
            },
            { label: "Add Treatment" },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
    goToPatientPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
    }
}
