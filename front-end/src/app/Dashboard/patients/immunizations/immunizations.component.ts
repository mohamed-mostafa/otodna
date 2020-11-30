import { PatientService } from "./../services/patient.service";
import { ImmunizationsService } from "./../services/immunizations.service";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Immunizations } from "./immunizations";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-immunizations",
    templateUrl: "./immunizations.component.html",
    styleUrls: ["./immunizations.component.css"],
})
export class ImmunizationsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    immunizations: any[] = [];
    immunizationsStatus = [];
    displayBasic: boolean;
    immunization: Immunizations = new Immunizations();
    selectedPatient;
    status;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private immunizationsService: ImmunizationsService,
        private confirmationService: ConfirmationService,
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.immunization.patientId = this.selectedPatient.id;
        this.cols = [
            { field: "vaccineName", header: "Vaccine Name" },
            { field: "status", header: "Status" },
            // { field: "provider", header: "Provider" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.getALlImmunizations();
        this.getImmunizationStatuses();
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
        this.immunization = new Immunizations();
    }
    reset() {
        this.immunization = new Immunizations();
        this.immunization.patientId = this.selectedPatient.id;
        this.status = "";
    }
    save() {
        this.validateImmunization((callback) => {
            if (callback === "valid") {
                this.immunization.immunizationStatusId = this.status.id;
                this.spinner.show();
                this.immunizationsService
                    .createImmunization(this.immunization)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlImmunizations();
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
        this.validateImmunization((callback) => {
            if (callback === "valid") {
                this.immunization.immunizationStatusId = this.status.id;
                delete this.immunization.statusName;
                this.spinner.show();
                this.immunizationsService
                    .updateImmunization(this.immunization)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlImmunizations();
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

    validateImmunization(callback) {
        if (!this.immunization.vaccineName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Vaccine name is required"
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
        if (!this.immunization.notedDate) {
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
    getALlImmunizations() {
        this.spinner.show();
        this.immunizationsService
            .getAllImmunizations(this.immunization.patientId)
            .subscribe(async (result) => {
                this.immunizations = await this.getImmunizationStatusById(
                    result
                );
                this.immunizations.sort(
                    (a, b) =>
                        new Date(b.notedDate).getTime() -
                        new Date(a.notedDate).getTime()
                );
                this.spinner.hide();
            });
    }
    getImmunizationStatuses() {
        this.spinner.show();
        this.immunizationsService
            .getImmunizationsStatuses()
            .subscribe(async (result) => {
                this.immunizationsStatus = result;
                this.spinner.hide();
            });
    }
    getImmunizationStatusById(immunizations) {
        immunizations.forEach((imm) => {
            this.immunizationsService
                .getImmunizationsStatusById(imm.immunizationStatusId)
                .subscribe((res) => {
                    imm.statusName = res.name;
                });
        });
        return immunizations;
    }
    deleteImmunization(immunization) {
        this.confirmationService.confirm({
            message: "Do you want to delete this immunization ?",
            header: "Delete immunization  Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.immunizationsService
                    .deleteImmunization(immunization.id)
                    .subscribe((u: any) => {
                        this.getALlImmunizations();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Immunization has been deleted"
                );
            },
        });
    }
    viewData(data) {
        this.showSaveButton = false;
        this.displayBasic = true;
        const found = this.immunizationsStatus.find(
            (r) => data.immunizationStatusId === r.id
        );
        this.status = found;
        this.immunization = data;
        this.immunization.notedDate = new Date(data.notedDate);
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
