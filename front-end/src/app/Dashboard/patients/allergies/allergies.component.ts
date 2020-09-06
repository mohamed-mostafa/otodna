import { AllergiesService } from "./../services/allergies.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Allergies } from "./allergies";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-allergies",
    templateUrl: "./allergies.component.html",
    styleUrls: ["./allergies.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class AllergiesComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
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
    selectedPatient;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private allergiesService: AllergiesService,
        private confirmationService: ConfirmationService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.allergy.patientId = this.selectedPatient.id;
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
            { field: "allergyType", header: "Allergy Type" },
            { field: "substance", header: "Substance" },
            { field: "reaction", header: "Reaction" },
            { field: "severity", header: "Severity" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.getALlAllergies();
        this.getALlTypes();
        this.getALlSeverities();
        this.getALlStatuses();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient.teamId
        );
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.allergy = new Allergies();
    }
    reset() {
        this.allergy = new Allergies();
        this.allergy.patientId = this.selectedPatient.id;
        this.type = "";
        this.severity = "";
        this.status = "";
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
        this.validateAllergy((callback) => {
            if (callback === "valid") {
                this.allergy.allergyTypeId = this.type.id;
                this.allergy.allergySeverityId = this.severity.id;
                this.allergy.allergyStatusId = this.status.id;
                delete this.allergy.typeName;
                delete this.allergy.severityName;
                delete this.allergy.statusName;
                this.spinner.show();
                this.allergiesService
                    .updateAllergy(this.allergy)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlAllergies();
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

    validateAllergy(callback) {
        if (!this.type) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Allergy type is required"
            );
            return false;
        }
        if (!this.allergy.substance) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Substance is required"
            );
            return false;
        }
        if (!this.allergy.reaction) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Reaction is required"
            );
            return false;
        }
        if (!this.severity) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Severity is required"
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
        if (!this.allergy.notedDate) {
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
    getALlAllergies() {
        this.spinner.show();
        this.allergiesService
            .getAllAllergies(this.allergy.patientId)
            .subscribe(async (result) => {
                this.allergies = await this.getAllergyTypeById(result);
                this.allergies = await this.getAllergySeverityById(result);
                this.allergies = await this.getAllergyStatusById(result);
                this.allergies.sort(
                    (a, b) =>
                        new Date(b.notedDate).getTime() -
                        new Date(a.notedDate).getTime()
                );
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
    deleteAllergy(allergy) {
        this.confirmationService.confirm({
            message: "Do you want to delete this allergy?",
            header: "Delete Allergy Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.allergiesService
                    .deleteAllergy(allergy.id)
                    .subscribe((u: any) => {
                        this.getALlAllergies();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Allergy has been deleted"
                );
            },
            reject: () => {
                this.showMessageComponent.showMessage(
                    "info",
                    "Rejected",
                    "You have rejected"
                );
            },
        });
    }
    viewData(data) {
        this.showSaveButton = false;
        this.displayBasic = true;
        const type = this.allergyTypes.find((r) => data.allergyTypeId === r.id);
        this.type = type;
        const severity = this.allergySeverities.find(
            (r) => data.allergySeverityId === r.id
        );
        this.severity = severity;
        const status = this.allergyStatuses.find(
            (r) => data.allergyStatusId === r.id
        );
        this.status = status;
        this.allergy = data;
        this.allergy.notedDate = new Date(data.notedDate);
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
