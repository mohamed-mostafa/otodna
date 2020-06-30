import { Router } from "@angular/router";
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
    showTableFlag = false;

    constructor(
        private messageService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
            },
        ];
        this.cols = [
            { field: "labTest", header: "Lab Test" },
            { field: "value", header: "Value" },
            { field: "unit", header: "Unit" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
    }
    showTable() {
        if (this.labResults.length > 0) {
            this.showTableFlag = true;
        }
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
            life: 3000,
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
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
}
