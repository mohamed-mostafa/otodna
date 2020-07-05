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
    recordTypes = [];
    displayBasic: boolean;
    vital: Vital = new Vital();
    recordType;
    showTableFlag = false;
    selectedPatient;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private vitalService: VitalService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.vital.patientId = this.selectedPatient.id;
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label:
                    this.selectedPatient.firstName +
                    " " +
                    this.selectedPatient.lastName,
            },
        ];
        this.cols = [
            { field: "recordType", header: "Record Type" },
            { field: "recordUnit", header: "Record Unit" },
            { field: "recordValue", header: "Record Value" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
        this.getALlVitals();
        this.getAllVitalRecordTypes();
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
                this.vital.vitalRecordTypeId = this.recordType.id;
                this.spinner.show();
                this.vitalService
                    .createVital(this.vital)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlVitals();
                        this.reset();
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
        if (!this.recordType) {
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
    reset() {
        this.vital = new Vital();
        this.vital.patientId = this.selectedPatient.id;
        this.recordType = "";
    }
    getALlVitals() {
        this.spinner.show();
        this.vitalService
            .getAllVitals(this.vital.patientId)
            .subscribe(async (result) => {
                this.vitals = await this.getVitalRecordTypeById(result);
                this.showTable();
                this.spinner.hide();
            });
    }
    getAllVitalRecordTypes() {
        this.spinner.show();
        this.vitalService.getAllVitalRecordTypes().subscribe(async (result) => {
            this.recordTypes = result;
            this.spinner.hide();
        });
    }
    getVitalRecordTypeById(vitals) {
        vitals.forEach((v) => {
            this.vitalService
                .getVitalRecordTypeById(v.vitalRecordTypeId)
                .subscribe((res) => {
                    v.vitalName = res.name;
                    v.vitalUnit = res.unit;
                });
        });
        return vitals;
    }
}
