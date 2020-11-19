import { PatientService } from "./../services/patient.service";
import { MedicationsService } from "./../services/medications.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Medication } from "./medication";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-medications",
    templateUrl: "./medications.component.html",
    styleUrls: ["./medications.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class MedicationsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    medications: any[] = [];
    statuses = [];
    displayBasic: boolean;
    medication: Medication = new Medication();
    selectedPatient;
    status;
    date;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private medicationsService: MedicationsService,
        private confirmationService: ConfirmationService,
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.medication.patientId = this.selectedPatient.id;
        this.cols = [
            { field: "medication", header: "Medication" },
            { field: "date", header: "Start Date" },
            { field: "date", header: "End Date" },
            { field: "quantity", header: "Quantity" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.getALlMedications();
        this.getMedicationStatuses();
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
        this.medication = new Medication();
    }
    reset() {
        this.medication = new Medication();
        this.medication.patientId = this.selectedPatient.id;
        this.status = "";
        this.date = "";
    }
    save() {
        this.validateMedication((callback) => {
            if (callback === "valid") {
                this.medication.medicationStatusId = this.status.id;
                this.medication.startDate = this.date[0];
                this.medication.endDate = this.date[1];
                this.spinner.show();
                this.medicationsService
                    .createMedication(this.medication)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlMedications();
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
        this.validateMedication((callback) => {
            if (callback === "valid") {
                this.medication.medicationStatusId = this.status.id;
                this.medication.startDate = this.date[0];
                this.medication.endDate = this.date[1];
                delete this.medication.statusName;
                this.spinner.show();
                this.medicationsService
                    .updateMedication(this.medication)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlMedications();
                        this.reset();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Updated",
                            "Data Updated successfully"
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
    validateMedication(callback) {
        if (!this.medication.medication) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Medication is required"
            );
            return false;
        }
        if (!this.date) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Start Date is required"
            );
            return false;
        }
        if (!this.date[1] || this.date[1] === null) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "End Date is required"
            );
            return false;
        }
        if (!this.medication.quantity) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Quantity is required"
            );
            return false;
        }
        if (!this.status) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Status is required"
            );
            return false;
        }
        if (!this.medication.notedDate) {
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
    getALlMedications() {
        this.spinner.show();
        this.medicationsService
            .getAllMedications(this.medication.patientId)
            .subscribe(async (result) => {
                this.medications = await this.getMedicationStatusById(result);
                this.medications.sort(
                    (a, b) =>
                        new Date(b.notedDate).getTime() -
                        new Date(a.notedDate).getTime()
                );
                this.spinner.hide();
            });
    }
    getMedicationStatuses() {
        this.spinner.show();
        this.medicationsService
            .getMedicationsStatuses()
            .subscribe(async (result) => {
                this.statuses = result;
                this.spinner.hide();
            });
    }
    getMedicationStatusById(medications) {
        medications.forEach((med) => {
            this.medicationsService
                .getMedicationsStatusById(med.medicationStatusId)
                .subscribe((res) => {
                    med.statusName = res.name;
                });
        });
        return medications;
    }
    deleteMedication(medication) {
        this.confirmationService.confirm({
            message: "Do you want to delete this medication?",
            header: "Delete medication Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.medicationsService
                    .deleteMedication(medication.id)
                    .subscribe((u: any) => {
                        this.getALlMedications();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Medication has been deleted"
                );
            },
        });
    }
    viewData(data) {
        this.showSaveButton = false;
        this.displayBasic = true;
        const found = this.statuses.find(
            (r) => data.medicationStatusId === r.id
        );
        this.status = found;
        this.date = [];
        this.date.push(new Date(data.startDate));
        this.date.push(new Date(data.endDate));
        this.medication = data;
        this.medication.notedDate = new Date(data.notedDate);
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
