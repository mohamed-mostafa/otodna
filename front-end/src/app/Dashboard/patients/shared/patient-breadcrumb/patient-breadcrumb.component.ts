import { PatientService } from "./../../services/patient.service";
import { Router } from "@angular/router";
import { SharedClass } from "./../sharedFunctions";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: "app-patient-breadcrumb",
    templateUrl: "./patient-breadcrumb.component.html",
    styleUrls: ["./patient-breadcrumb.component.css"],
})
export class PatientBreadcrumbComponent implements OnInit {
    @Input() firstName;
    @Input() lastName;
    sharedClass: SharedClass = new SharedClass(this.patientService);
    items: MenuItem[];
    home: MenuItem;
    constructor(
        private router: Router,
        private patientService: PatientService
    ) {}

    ngOnInit(): void {
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label: this.firstName + " " + this.lastName,
            },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
}
