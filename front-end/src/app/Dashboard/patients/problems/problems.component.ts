import { ProblemsService } from "./../services/problems.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Problem } from "./problem";

@Component({
    selector: "app-problems",
    templateUrl: "./problems.component.html",
    styleUrls: ["./problems.component.css"],
    providers: [MessageService],
})
export class ProblemsComponent implements OnInit {
    cols: any[];
    items: MenuItem[];
    home: MenuItem;
    problems: any[] = [];
    statuses = [];
    displayBasic: boolean;
    problem: Problem = new Problem();
    showTableFlag = false;
    selectedPatient;
    status;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private problemsService: ProblemsService,
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
        this.home = { icon: "fa fa-user-md" };
        this.showTable();
        this.getALlProblems();
        this.getProblemStatuses();
    }
    showTable() {
        if (this.problems.length > 0) {
            this.showTableFlag = true;
        }
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
                this.problem.notedDate = new Date(
                    this.problem.notedDate.setDate(
                        this.problem.notedDate.getDate() + 1
                    )
                );
                this.spinner.show();
                this.problemsService
                    .createProblem(this.problem)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlProblems();
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
    validateProblem(callback) {
        // if (!this.problem.problem) {
        //     this.showMessage(
        //         "error",
        //         "Validation Error",
        //         "Problem is required"
        //     );
        //     return false;
        // }
        if (!this.status) {
            this.showMessage("error", "Validation Error", "Status is required");
            return false;
        }
        if (!this.problem.notedDate) {
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
    getALlProblems() {
        this.spinner.show();
        this.problemsService
            .getAllProblems(this.problem.patientId)
            .subscribe(async (result) => {
                this.problems = await this.getProblemStatusById(result);
                this.showTable();
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
}
