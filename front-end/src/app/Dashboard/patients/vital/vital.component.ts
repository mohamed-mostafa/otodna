import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Vital } from "./vital";

@Component({
    selector: "app-vital",
    templateUrl: "./vital.component.html",
    styleUrls: ["./vital.component.css"],
})
export class VitalComponent implements OnInit {
    cols: any[];
    vitals: any[] = [];
    recordType = [];
    recordValue = [];
    displayBasic: boolean;
    vital: Vital = new Vital();
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.cols = [
            { field: "recordType", header: "Record Type" },
            { field: "recordValue", header: "Record Value" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.recordType = [
            {
                name: "Body Tempreture",
            },
            {
                name: "Blood pressure",
            },
            {
                name: "Heart Rate",
            },
            {
                name: "Height",
            },
            {
                name: "Respiration rate",
            },
            {
                name: "Weight",
            },
            {
                name: "Oxygen saturation",
            },
        ];
        this.recordValue = [
            {
                name: "Value* °C",
            },
            {
                name: "BP Systolic * mmHg",
            },
            {
                name: "BP Diastolic * mmHg",
            },
            {
                name: "Value * bpm",
            },
            {
                name: "Value*cm",
            },
            {
                name: "Value * breaths/m",
            },
            {
                name: "Value*kg",
            },
            {
                name: "Value * Percent",
            },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.vital = new Vital();
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.vitals.push(this.vital);
            this.displayBasic = false;
            this.vital = new Vital();
            this.spinner.hide();
        }, 2000);
    }
}
