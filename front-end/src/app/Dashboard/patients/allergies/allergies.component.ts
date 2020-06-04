import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Allergies } from "./allergies";

@Component({
    selector: "app-allergies",
    templateUrl: "./allergies.component.html",
    styleUrls: ["./allergies.component.css"],
    providers: [MessageService],
})
export class AllergiesComponent implements OnInit {
    cols: any[];
    allergies: any[] = [];
    recordType = [];
    recordValue = [];
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    showPagination = false;
    allergy: Allergies = new Allergies();
    allergyType = [];
    severity = [];
    showTableFlag = false;
    allergiesStatus = [];
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
            { field: "allergyType", header: "Allergy Type" },
            { field: "substance", header: "Substance" },
            { field: "reaction", header: "Reaction" },
            { field: "severity", header: "Severity" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.allergyType = [
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
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
    }
    showTable() {
        if (this.allergies.length > 0) {
            this.showTableFlag = true;
        }
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.allergy = new Allergies();
    }
    save() {
        this.validateAllergy((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.allergies.push(this.allergy);
                    this.showPagination = true;
                    this.displayBasic = false;
                    this.allergy = new Allergies();
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
    validateAllergy(callback) {
        if (!this.allergy.allergyType) {
            this.showMessage(
                "error",
                "Validation Error",
                "Allergy type is required"
            );
            return false;
        }
        if (!this.allergy.substance) {
            this.showMessage(
                "error",
                "Validation Error",
                "Substance is required"
            );
            return false;
        }
        if (!this.allergy.reaction) {
            this.showMessage(
                "error",
                "Validation Error",
                "Reaction is required"
            );
            return false;
        }
        if (!this.allergy.severity) {
            this.showMessage(
                "error",
                "Validation Error",
                "Severity is required"
            );
            return false;
        }
        if (!this.allergy.status) {
            this.showMessage("error", "Validation Error", "Status is required");
            return false;
        }
        if (!this.allergy.notedDate) {
            this.showMessage(
                "error",
                "Validation Error",
                "Noted date is required"
            );
            return false;
        }
        if (!this.allergy.comments) {
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
