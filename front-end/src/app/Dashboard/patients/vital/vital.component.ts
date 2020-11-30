import { PatientService } from "./../services/patient.service";
import { VitalService } from "./../services/vital.service";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Vital } from "./vital";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-vital",
    templateUrl: "./vital.component.html",
    styleUrls: ["./vital.component.css"],
})
export class VitalComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    vitals: any[] = [];
    recordTypes = [];
    displayBasic: boolean;
    vital: Vital = new Vital();
    recordType;
    selectedPatient;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private vitalService: VitalService,
        private confirmationService: ConfirmationService,
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.vital.patientId = this.selectedPatient.id;
        this.cols = [
            { field: "recordType", header: "Record Type" },
            { field: "recordUnit", header: "Record Unit" },
            { field: "recordValue", header: "Record Value" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.getALlVitals();
        this.getAllVitalRecordTypes();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
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
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    update() {
        this.validateVital((callback) => {
            if (callback === "valid") {
                this.vital.vitalRecordTypeId = this.recordType.id;
                delete this.vital.vitalName;
                delete this.vital.vitalUnit;
                this.spinner.show();
                this.vitalService
                    .updateVital(this.vital)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlVitals();
                        this.reset();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Updated",
                            "Data updated successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }

    validateVital(callback) {
        if (!this.recordType) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Record type is required"
            );
            return false;
        }
        if (!this.vital.vitalRecordValue) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Record value is required"
            );
            return false;
        }
        if (!this.vital.notedDate) {
            this.showMessageComponent.showMessage(
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
        this.sharedClass.goToDashboard(this.router);
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
                this.vitals.sort(
                    (a, b) =>
                        new Date(b.notedDate).getTime() -
                        new Date(a.notedDate).getTime()
                );
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
    deleteVital(vital) {
        this.confirmationService.confirm({
            message: "Do you want to delete this vital?",
            header: "Delete vital Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.vitalService.deleteVital(vital.id).subscribe((u: any) => {
                    this.getALlVitals();
                    this.spinner.hide();
                });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Vital has been deleted"
                );
            },
        });
    }
    viewData(data) {
        this.showSaveButton = false;
        this.displayBasic = true;
        const found = this.recordTypes.find(
            (r) => data.vitalRecordTypeId === r.id
        );
        this.recordType = found;
        this.vital = data;
        this.vital.notedDate = new Date(data.notedDate);
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
