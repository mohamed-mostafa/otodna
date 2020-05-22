import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Problem } from "./problem";

@Component({
    selector: "app-problems",
    templateUrl: "./problems.component.html",
    styleUrls: ["./problems.component.css"],
})
export class ProblemsComponent implements OnInit {
    cols: any[];
    problems: any[] = [];
    status = [];
    displayBasic: boolean;
    problem: Problem = new Problem();
    constructor(private spinner: NgxSpinnerService) {}

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
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.problem = new Problem();
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.problems.push(this.problem);
            this.displayBasic = false;
            this.problem = new Problem();
            this.spinner.hide();
        }, 2000);
    }
}
