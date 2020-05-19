import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-new-patient",
    templateUrl: "./new-patient.component.html",
    styleUrls: ["./new-patient.component.css"],
})
export class NewPatientComponent implements OnInit {
    gender = [];
    recordType = [];
    recordValue = [];
    alergyType = [];
    severity = [];
    allergiesStatus = [];
    immunizationsStatus = [];
    medicationStatus = [];
    index = 0;
    show = true;
    constructor() {}

    ngOnInit(): void {
        this.gender = [{ name: "Male" }, { name: "Female" }];
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
        this.alergyType = [
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
        this.medicationStatus = [
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
    goToNext() {
        this.show = false;
        this.index = this.index + 1;
    }
    onTabChange(event) {
        this.index = event.index;
    }
}
