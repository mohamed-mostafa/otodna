import { ImmunizationsService } from "./../services/immunizations.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Immunizations } from "./immunizations";

@Component({
    selector: "app-immunizations",
    templateUrl: "./immunizations.component.html",
    styleUrls: ["./immunizations.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class ImmunizationsComponent implements OnInit {
    cols: any[];
    immunizations: any[] = [];
    immunizationsStatus = [];
    items: MenuItem[];
    home: MenuItem;
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
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.immunization.patientId = this.selectedPatient.id;
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
            { field: "vaccineName", header: "Vaccine Name" },
            { field: "status", header: "Status" },
            // { field: "provider", header: "Provider" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.getALlImmunizations();
        this.getImmunizationStatuses();
        this.checkLoggedInUserTeamWithPatient();
    }
    checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        if (LoggedInUser.teams.length > 0) {
            const found = LoggedInUser.teams.some(
                (team) => team.id === this.selectedPatient.teamId
            );
            if (found) {
                this.showAllButtons = true;
            } else {
                this.showAllButtons = false;
            }
        }
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
                        this.showMessage(
                            "success",
                            "Updated",
                            "Data Updated successfully"
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
    validateImmunization(callback) {
        if (!this.immunization.vaccineName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Vaccine name is required"
            );
            return false;
        }
        if (!this.status) {
            this.showMessage("error", "Validation Error", "Status is required");
            return false;
        }
        if (!this.immunization.notedDate) {
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
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Immunization has been deleted"
                );
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
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
