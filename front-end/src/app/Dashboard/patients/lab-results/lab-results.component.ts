import { PatientService } from "./../services/patient.service";
import { LabResultsService } from "./../services/lab-results.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { LabResult } from "./labResult";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-lab-results",
    templateUrl: "./lab-results.component.html",
    styleUrls: ["./lab-results.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class LabResultsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
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
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.labResult.patientId = this.selectedPatient.id;
        this.cols = [
            { field: "labTest", header: "Lab Test" },
            { field: "value", header: "Value" },
            { field: "unit", header: "Unit" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.getALlLabResults();
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

    validateLabResult(callback) {
        if (!this.labResult.labTest) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Lab test is required"
            );
            return false;
        }
        if (!this.labResult.value) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Value is required"
            );
            return false;
        }
        if (!this.labResult.unit) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Unit is required"
            );
            return false;
        }
        if (!this.labResult.notedDate) {
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
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Lab result has been deleted"
                );
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
