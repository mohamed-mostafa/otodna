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
    showPagination = false;
    vital: Vital = new Vital();
    showTableFlag = false;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}
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
                setTimeout(() => {
                    this.vitals.push(this.vital);
                    this.showPagination = true;
                    this.displayBasic = false;
                    this.vital = new Vital();
                    this.showTable();
                    this.showMessage(
                        "success",
                        "Saved",
                        "Data saved successfully"
                    );
                    this.spinner.hide();
                }, 2000);
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
            life: 1000,
        });
    }
    validateVital(callback) {
        if (!this.vital.recordType) {
            this.showMessage(
                "error",
                "Validation Error",
                "Record type is required"
            );
            return false;
        }
        if (!this.vital.recordValue) {
            this.showMessage(
                "error",
                "Validation Error",
                "Record value is required"
            );
            return false;
        }
        if (!this.vital.recordValueType) {
            this.showMessage(
                "error",
                "Validation Error",
                "Record value type is required"
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
        }
        if (!this.vital.comments) {
            this.showMessage(
                "error",
                "Validation Error",
                "Comments is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
}
