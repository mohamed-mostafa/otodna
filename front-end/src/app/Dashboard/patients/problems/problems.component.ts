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
    status = [];
    displayBasic: boolean;
    problem: Problem = new Problem();
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.cols = [
            { field: "problem", header: "Problem" },
            { field: "status", header: "Status" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
        this.status = [
            {
                name: "Active",
            },
            {
                name: "Inactive",
            },
            {
                name: "Resolved",
            },
        ];
        this.items = [{ label: "Patients" }, { label: "Create Patient" }];
        this.home = { icon: "fa fa-user-md" };
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.problem = new Problem();
    }
    save() {
        this.validateProblem((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.problems.push(this.problem);
                    this.displayBasic = false;
                    this.problem = new Problem();
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
    validateProblem(callback) {
        if (!this.problem.problem) {
            this.showMessage(
                "error",
                "Validation Error",
                "Problem is required"
            );
            return false;
        }
        if (!this.problem.status) {
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
        }
        if (!this.problem.comments) {
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
