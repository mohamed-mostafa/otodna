import { ImmunizationsService } from "./../services/immunizations.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Immunizations } from "./immunizations";

@Component({
    selector: "app-immunizations",
    templateUrl: "./immunizations.component.html",
    styleUrls: ["./immunizations.component.css"],
    providers: [MessageService],
})
export class ImmunizationsComponent implements OnInit {
    cols: any[];
    immunizations: any[] = [];
    immunizationsStatus = [];
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    immunization: Immunizations = new Immunizations();
    showTableFlag = false;
    selectedPatient;
    status;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private immunizationsService: ImmunizationsService,
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
        this.showTable();
        this.getALlImmunizations();
        this.getImmunizationStatuses();
    }
    showTable() {
        if (this.immunizations.length > 0) {
            this.showTableFlag = true;
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
                this.immunization.notedDate = new Date(
                    this.immunization.notedDate.setDate(
                        this.immunization.notedDate.getDate() + 1
                    )
                );
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
                this.showTable();
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
}
