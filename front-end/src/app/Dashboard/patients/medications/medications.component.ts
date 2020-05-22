import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Medication } from "./medication";

@Component({
    selector: "app-medications",
    templateUrl: "./medications.component.html",
    styleUrls: ["./medications.component.css"],
})
export class MedicationsComponent implements OnInit {
    cols: any[];
    medications: any[] = [];
    status = [];
    displayBasic: boolean;
    medication: Medication = new Medication();
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.cols = [
            { field: "medication", header: "Medication" },
            { field: "date", header: "Start Date" },
            { field: "date", header: "End Date" },
            { field: "quantity", header: "Quantity" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.status = [
            {
                name: "Active",
            },
            {
                name: "On hold",
            },
            {
                name: "Prior history",
            },
            {
                name: "No longer active",
            },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.medication = new Medication();
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.medications.push(this.medication);
            this.displayBasic = false;
            this.medication = new Medication();
            this.spinner.hide();
        }, 2000);
    }
}
