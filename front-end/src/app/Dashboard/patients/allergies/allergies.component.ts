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
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    allergy: Allergies = new Allergies();
    allergyTypes = [];
    type;
    allergySeverities = [];
    severity;
    allergyStatuses = [];
    status;
    showTableFlag = false;
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
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
        this.getALlAllergies();
        this.getALlTypes();
        this.getALlSeverities();
        this.getALlStatuses();
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
                this.allergy.allergyTypeId = this.type.id;
                this.allergy.allergySeverityId = this.severity.id;
                this.allergy.allergyStatusId = this.status.id;
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
        if (!this.type) {
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
        if (!this.severity) {
            this.showMessage(
                "error",
                "Validation Error",
                "Severity is required"
            );
            return false;
        }
        if (!this.status) {
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
                this.allergies = await this.getAllergyTypeById(result);
                this.allergies = await this.getAllergySeverityById(result);
                this.allergies = await this.getAllergyStatusById(result);
                this.showTable();
                this.spinner.hide();
            });
    }
    getALlTypes() {
        this.spinner.show();
        this.allergiesService.getAllAllergyTypes().subscribe(async (result) => {
            this.allergyTypes = result;
            this.spinner.hide();
        });
    }
    getAllergyTypeById(allergies) {
        allergies.forEach((all) => {
            this.allergiesService
                .getAllergyTypeById(all.allergyTypeId)
                .subscribe((res) => {
                    all.typeName = res.name;
                });
        });
        return allergies;
    }
    getALlSeverities() {
        this.spinner.show();
        this.allergiesService
            .getAllAllergySeverities()
            .subscribe(async (result) => {
                this.allergySeverities = result;
                this.spinner.hide();
            });
    }
    getAllergySeverityById(allergies) {
        allergies.forEach((all) => {
            this.allergiesService
                .getAllergySeverityById(all.allergySeverityId)
                .subscribe((res) => {
                    all.severityName = res.name;
                });
        });
        return allergies;
    }
    getALlStatuses() {
        this.spinner.show();
        this.allergiesService
            .getAllAllergyStatuses()
            .subscribe(async (result) => {
                this.allergyStatuses = result;
                this.spinner.hide();
            });
    }
    getAllergyStatusById(allergies) {
        allergies.forEach((all) => {
            this.allergiesService
                .getAllergyStatusById(all.allergyStatusId)
                .subscribe((res) => {
                    all.statusName = res.name;
                });
        });
        return allergies;
    }
}
