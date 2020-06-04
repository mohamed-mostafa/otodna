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
    status = [];
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    showTableFlag = false;
    medication: Medication = new Medication();
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
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
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
    save() {
        this.validateMedication((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.medications.push(this.medication);
                    this.displayBasic = false;
                    this.medication = new Medication();
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
    validateMedication(callback) {
        if (!this.medication.medication) {
            this.showMessage(
                "error",
                "Validation Error",
                "Medication is required"
            );
            return false;
        }
        if (!this.medication.date) {
            this.showMessage("error", "Validation Error", "Date is required");
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
        if (!this.medication.status) {
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
        }
        if (!this.medication.comments) {
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
