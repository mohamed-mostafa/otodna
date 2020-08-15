import { LabResultsService } from "./../services/lab-results.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { LabResult } from "./labResult";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-lab-results",
    templateUrl: "./lab-results.component.html",
    styleUrls: ["./lab-results.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class LabResultsComponent implements OnInit {
    cols: any[];
    items: MenuItem[];
    home: MenuItem;
    labResults: any[] = [];
    displayBasic: boolean;
    labResult: LabResult = new LabResult();
    selectedPatient;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private labResultsService: LabResultsService,
        private confirmationService: ConfirmationService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.labResult.patientId = this.selectedPatient.id;
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
            { field: "labTest", header: "Lab Test" },
            { field: "value", header: "Value" },
            { field: "unit", header: "Unit" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.getALlLabResults();
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
        this.labResult = new LabResult();
    }
    reset() {
        this.labResult = new LabResult();
        this.labResult.patientId = this.selectedPatient.id;
    }
    save() {
        this.validateLabResult((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.labResultsService
                    .createLabResult(this.labResult)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlLabResults();
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
        this.validateLabResult((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.labResultsService
                    .updateLabResult(this.labResult)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlLabResults();
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
    getALlLabResults() {
        this.spinner.show();
        this.labResultsService
            .getAllLabResults(this.labResult.patientId)
            .subscribe(async (result) => {
                this.labResults = result;
                this.labResults.sort(
                    (a, b) =>
                        new Date(b.notedDate).getTime() -
                        new Date(a.notedDate).getTime()
                );
                this.spinner.hide();
            });
    }
    deleteLabResult(labResult) {
        this.confirmationService.confirm({
            message: "Do you want to delete this labResult ?",
            header: "Delete labResult Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.labResultsService
                    .deleteLabResult(labResult.id)
                    .subscribe((u: any) => {
                        this.getALlLabResults();
                        this.spinner.hide();
                    });
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Lab result has been deleted"
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
        this.labResult = data;
        this.labResult.notedDate = new Date(data.notedDate);
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
