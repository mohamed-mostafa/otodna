import { PatientService } from "./../services/patient.service";
import { ProblemsService } from "./../services/problems.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Problem } from "./problem";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-problems",
    templateUrl: "./problems.component.html",
    styleUrls: ["./problems.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class ProblemsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    problems: any[] = [];
    statuses = [];
    displayBasic: boolean;
    problem: Problem = new Problem();
    selectedPatient;
    status;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private problemsService: ProblemsService,
        private confirmationService: ConfirmationService,
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.cols = [
            // { field: "problem", header: "Problem" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comment", header: "Comment" },
        ];
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.problem.patientId = this.selectedPatient.id;
        this.getALlProblems();
        this.getProblemStatuses();
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
        this.problem = new Problem();
    }
    reset() {
        this.problem = new Problem();
        this.problem.patientId = this.selectedPatient.id;
        this.status = "";
    }
    save() {
        this.validateProblem((callback) => {
            if (callback === "valid") {
                this.problem.problemStatusId = this.status.id;
                this.spinner.show();
                this.problemsService
                    .createProblem(this.problem)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlProblems();
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
        this.validateProblem((callback) => {
            if (callback === "valid") {
                this.problem.problemStatusId = this.status.id;
                delete this.problem.statusName;
                this.spinner.show();
                this.problemsService
                    .updateProblem(this.problem)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlProblems();
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

    validateProblem(callback) {
        // if (!this.problem.problem) {
        //     this.showMessageComponent.showMessage(
        //         "error",
        //         "Validation Error",
        //         "Problem is required"
        //     );
        //     return false;
        // }
        if (!this.status) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Status is required"
            );
            return false;
        }
        if (!this.problem.notedDate) {
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
    getALlProblems() {
        this.spinner.show();
        this.problemsService
            .getAllProblems(this.problem.patientId)
            .subscribe(async (result) => {
                this.problems = await this.getProblemStatusById(result);
                this.problems.sort(
                    (a, b) =>
                        new Date(b.notedDate).getTime() -
                        new Date(a.notedDate).getTime()
                );
                this.spinner.hide();
            });
    }
    getProblemStatuses() {
        this.spinner.show();
        this.problemsService.getProblemsStatuses().subscribe(async (result) => {
            this.statuses = result;
            this.spinner.hide();
        });
    }
    getProblemStatusById(problems) {
        problems.forEach((prob) => {
            this.problemsService
                .getProblemsStatusById(prob.problemStatusId)
                .subscribe((res) => {
                    prob.statusName = res.name;
                });
        });
        return problems;
    }
    deleteProblem(problem) {
        this.confirmationService.confirm({
            message: "Do you want to delete this problem?",
            header: "Delete problem Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.problemsService
                    .deleteProblem(problem.id)
                    .subscribe((u: any) => {
                        this.getALlProblems();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Problem has been deleted"
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
        const found = this.statuses.find((r) => data.problemStatusId === r.id);
        this.status = found;
        this.problem = data;
        this.problem.notedDate = new Date(data.notedDate);
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
