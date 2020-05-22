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
    displayBasic: boolean;
    immunization: Immunizations = new Immunizations();
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.cols = [
            { field: "vaccineName", header: "Vaccine Name" },
            { field: "status", header: "Status" },
            { field: "provider", header: "Provider" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.immunizationsStatus = [
            {
                name: "Active",
            },
            {
                name: "Inactive",
            },
            {
                name: "Pending",
            },
            {
                name: "Completed",
            },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.immunization = new Immunizations();
    }
    save() {
        this.validateImmunization((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.immunizations.push(this.immunization);
                    this.displayBasic = false;
                    this.immunization = new Immunizations();
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
    validateImmunization(callback) {
        if (!this.immunization.vaccineName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Vaccine name is required"
            );
            return false;
        }
        if (!this.immunization.status) {
            this.showMessage("error", "Validation Error", "Status is required");
            return false;
        }
        if (!this.immunization.provider) {
            this.showMessage(
                "error",
                "Validation Error",
                "Provider is required"
            );
            return false;
        }
        if (!this.immunization.notedDate) {
            this.showMessage(
                "error",
                "Validation Error",
                "Noted date is required"
            );
            return false;
        }
        if (!this.immunization.comments) {
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
