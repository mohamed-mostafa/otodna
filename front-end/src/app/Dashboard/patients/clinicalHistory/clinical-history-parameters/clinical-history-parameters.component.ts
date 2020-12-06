import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-clinical-history-parameters",
    templateUrl: "./clinical-history-parameters.component.html",
    styleUrls: ["./clinical-history-parameters.component.css"],
})
export class ClinicalHistoryParametersComponent implements OnInit {
    @Input() showDialogRightData;
    @Input() showDialogLeftData;
    @Input() parameters;
    disableLeftDialogTest = false;
    disableRightDialogTest = false;
    earItems = [];
    constructor() {}

    ngOnInit(): void {
        this.earItems = [
            { item: "Right Ear", value: "R" },
            { item: "BOTH Ears", value: "BOTH" },
            { item: "Left Ear", value: "L" },
        ];
        this.checkCheckboxSelection();
    }
    checkCheckboxSelection() {
        if (!this.showDialogRightData) {
            this.disableLeftDialogTest = true;
        } else {
            this.disableLeftDialogTest = false;
        }
        if (!this.showDialogLeftData) {
            this.disableRightDialogTest = true;
        } else {
            this.disableRightDialogTest = false;
        }
    }
}
