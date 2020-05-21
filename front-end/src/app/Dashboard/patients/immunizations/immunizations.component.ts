import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Immunizations } from "./immunizations";

@Component({
    selector: "app-immunizations",
    templateUrl: "./immunizations.component.html",
    styleUrls: ["./immunizations.component.css"],
})
export class ImmunizationsComponent implements OnInit {
    cols: any[];
    immunizations: any[] = [];
    immunizationsStatus = [];
    displayBasic: boolean;
    immunization: Immunizations = new Immunizations();
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.cols = [
            { field: "vaccineName", header: "Vaccine Name" },
            { field: "status", header: "Status" },
            { field: "provider", header: "Provider" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.immunizationsStatus = [
            {
                name: "Active",
            },
            {
                name: "Inactive",
            },
            {
                name: "Pending",
            },
            {
                name: "Completed",
            },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.immunization = new Immunizations();
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.immunizations.push(this.immunization);
            this.displayBasic = false;
            this.immunization = new Immunizations();
            this.spinner.hide();
        }, 2000);
    }
}
