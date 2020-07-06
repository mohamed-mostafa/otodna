import { MedicationsService } from "./../services/medications.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Medication } from "./medication";

@Component({
    selector: "app-medications",
    templateUrl: "./medications.component.html",
    styleUrls: ["./medications.component.css"],
    providers: [MessageService],
})
export class MedicationsComponent implements OnInit {
    cols: any[];
    medications: any[] = [];
    statuses = [];
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    showTableFlag = false;
    medication: Medication = new Medication();
    selectedPatient;
    status;
    date;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private medicationsService: MedicationsService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.medication.patientId = this.selectedPatient.id;
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
            { field: "medication", header: "Medication" },
            { field: "date", header: "Start Date" },
            { field: "date", header: "End Date" },
            { field: "quantity", header: "Quantity" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
        this.getALlMedications();
        this.getMedicationStatuses();
    }
    showTable() {
        if (this.medications.length > 0) {
            this.showTableFlag = true;
        }
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
                this.medication.startDate = new Date(
                    this.medication.startDate.setDate(
                        this.medication.startDate.getDate() + 1
                    )
                );
                this.medication.endDate = this.date[1];
                this.medication.endDate = new Date(
                    this.medication.endDate.setDate(
                        this.medication.endDate.getDate() + 1
                    )
                );
                this.medication.notedDate = new Date(
                    this.medication.notedDate.setDate(
                        this.medication.notedDate.getDate() + 1
                    )
                );
                this.spinner.show();
                this.medicationsService
                    .createMedication(this.medication)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlMedications();
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
    validateMedication(callback) {
        if (!this.medication.medication) {
            this.showMessage(
                "error",
                "Validation Error",
                "Medication is required"
            );
            return false;
        }
        if (!this.date) {
            this.showMessage(
                "error",
                "Validation Error",
                "Start Date is required"
            );
            return false;
        }
        if (!this.date[1] || this.date[1] === null) {
            this.showMessage(
                "error",
                "Validation Error",
                "End Date is required"
            );
            return false;
        }
        if (!this.medication.quantity) {
            this.showMessage(
                "error",
                "Validation Error",
                "Quantity is required"
            );
            return false;
        }
        if (!this.status) {
            this.showMessage("error", "Validation Error", "Status is required");
            return false;
        }
        if (!this.medication.notedDate) {
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
    getALlMedications() {
        this.spinner.show();
        this.medicationsService
            .getAllMedications(this.medication.patientId)
            .subscribe(async (result) => {
                this.medications = await this.getMedicationStatusById(result);
                this.showTable();
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
}
