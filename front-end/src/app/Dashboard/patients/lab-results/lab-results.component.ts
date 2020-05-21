import { NgxSpinnerService } from "ngx-spinner";
import { LabResult } from "./labResult";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-lab-results",
    templateUrl: "./lab-results.component.html",
    styleUrls: ["./lab-results.component.css"],
})
export class LabResultsComponent implements OnInit {
    cols: any[];
    labResults: any[] = [];
    displayBasic: boolean;
    labResult: LabResult = new LabResult();
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.cols = [
            { field: "labTest", header: "Lab Test" },
            { field: "value", header: "Value" },
            { field: "unit", header: "Unit" },
            { field: "notedDate", header: "Noted Date" },
            { field: "comments", header: "Comments" },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.labResult = new LabResult();
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.labResults.push(this.labResult);
            this.displayBasic = false;
            this.labResult = new LabResult();
            this.spinner.hide();
        }, 2000);
    }
}
