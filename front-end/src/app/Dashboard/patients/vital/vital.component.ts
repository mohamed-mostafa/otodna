import { VitalService } from "./../services/vital.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Vital } from "./vital";

@Component({
    selector: "app-vital",
    templateUrl: "./vital.component.html",
    styleUrls: ["./vital.component.css"],
    providers: [MessageService],
})
export class VitalComponent implements OnInit {
    cols: any[];
    vitals: any[] = [];
    items: MenuItem[];
    home: MenuItem;
    recordType = [];
    recordValue = [];
    displayBasic: boolean;
    vital: Vital = new Vital();
    showTableFlag = false;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private vitalService: VitalService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.vital.patientId = selectedPatient.id;
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label:
                    selectedPatient.firstName + " " + selectedPatient.lastName,
            },
        ];
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
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
        this.getALlVitals();
    }
    showTable() {
        if (this.vitals.length > 0) {
            this.showTableFlag = true;
        }
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.vital = new Vital();
    }
    save() {
        this.validateVital((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.vitalService
                    .createVital(this.vital)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlVitals();
                        this.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessage("warn", "Error", "Please try again");
            }
        });
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    validateVital(callback) {
        if (!this.vital.vitalRecordTypeId) {
            this.showMessage(
                "error",
                "Validation Error",
                "Record type is required"
            );
            return false;
        }
        if (!this.vital.vitalRecordValue) {
            this.showMessage(
                "error",
                "Validation Error",
                "Record value is required"
            );
            return false;
        }
        if (!this.vital.notedDate) {
            this.showMessage(
                "error",
                "Validation Error",
                "Noted date is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
    getALlVitals() {
        this.spinner.show();
        this.vitalService
            .getAllVitals(this.vital.patientId)
            .subscribe(async (result) => {
                this.vitals = result;
                this.showTable();
                this.spinner.hide();
            });
    }
}
