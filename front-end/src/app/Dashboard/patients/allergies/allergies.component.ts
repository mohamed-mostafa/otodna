import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Allergies } from "./allergies";

@Component({
    selector: "app-allergies",
    templateUrl: "./allergies.component.html",
    styleUrls: ["./allergies.component.css"],
})
export class AllergiesComponent implements OnInit {
    cols: any[];
    allergies: any[] = [];
    recordType = [];
    recordValue = [];
    displayBasic: boolean;
    allergy: Allergies = new Allergies();
    allergyType = [];
    severity = [];
    allergiesStatus = [];
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.cols = [
            { field: "allergyType", header: "Allergy Type" },
            { field: "substance", header: "Substance" },
            { field: "reaction", header: "Reaction" },
            { field: "severity", header: "Severity" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.allergyType = [
            {
                name: "Unknown",
            },
            {
                name: "Food",
            },
            {
                name: "Enviromental",
            },
            {
                name: "Medication",
            },
        ];
        this.severity = [
            {
                name: "Mild",
            },
            {
                name: "Mild to moderate",
            },
            {
                name: "Moderate",
            },
            {
                name: "Moderate to severe",
            },
            {
                name: "Severe",
            },
            {
                name: "Fatal",
            },
        ];
        this.allergiesStatus = [
            {
                name: "Active",
            },
            {
                name: "Inactive",
            },
            {
                name: "Resolved",
            },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.allergy = new Allergies();
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.allergies.push(this.allergy);
            this.displayBasic = false;
            this.allergy = new Allergies();
            this.spinner.hide();
        }, 2000);
    }
}
