import { AllergiesService } from "./../services/allergies.service";
import { Router } from "@angular/router";
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
    allergy: Allergies = new Allergies();
    allergyType = [];
    severity = [];
    showTableFlag = false;
    allergiesStatus = [];
    constructor(
        private messageService: MessageService,
        private router: Router,
        private allergiesService: AllergiesService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.allergy.patientId = selectedPatient.id;
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
        this.getALlAllergies();
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
                this.spinner.show();
                this.allergiesService
                    .createAllergy(this.allergy)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlAllergies();
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
    validateAllergy(callback) {
        if (!this.allergy.allergyTypeId) {
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
        if (!this.allergy.allergySeverityId) {
            this.showMessage(
                "error",
                "Validation Error",
                "Severity is required"
            );
            return false;
        }
        if (!this.allergy.allergyStatusId) {
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
    getALlAllergies() {
        this.spinner.show();
        this.allergiesService
            .getAllAllergies(this.allergy.patientId)
            .subscribe(async (result) => {
                this.allergies = result;
                this.showTable();
                this.spinner.hide();
            });
    }
}
