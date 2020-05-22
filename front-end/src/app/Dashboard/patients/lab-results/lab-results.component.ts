import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { LabResult } from "./labResult";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-lab-results",
    templateUrl: "./lab-results.component.html",
    styleUrls: ["./lab-results.component.css"],
    providers: [MessageService],
})
export class LabResultsComponent implements OnInit {
    cols: any[];
    items: MenuItem[];
    home: MenuItem;
    labResults: any[] = [];
    displayBasic: boolean;
    labResult: LabResult = new LabResult();
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.cols = [
            { field: "labTest", header: "Lab Test" },
            { field: "value", header: "Value" },
            { field: "unit", header: "Unit" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.items = [{ label: "Patients" }, { label: "Create Patient" }];
        this.home = { icon: "fa fa-user-md" };
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.labResult = new LabResult();
    }
    save() {
        this.validateLabResult((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.labResults.push(this.labResult);
                    this.displayBasic = false;
                    this.labResult = new LabResult();
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
    validateLabResult(callback) {
        if (!this.labResult.labTest) {
            this.showMessage(
                "error",
                "Validation Error",
                "Lab test is required"
            );
            return false;
        }
        if (!this.labResult.value) {
            this.showMessage("error", "Validation Error", "Value is required");
            return false;
        }
        if (!this.labResult.unit) {
            this.showMessage("error", "Validation Error", "Unit is required");
            return false;
        }
        if (!this.labResult.notedDate) {
            this.showMessage(
                "error",
                "Validation Error",
                "Noted date is required"
            );
            return false;
        }
        if (!this.labResult.comments) {
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
