import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Family } from "./family";

@Component({
    selector: "app-family",
    templateUrl: "./family.component.html",
    styleUrls: ["./family.component.css"],
})
export class FamilyComponent implements OnInit {
    cols: any[];
    families: any[] = [];
    displayBasic: boolean;
    family: Family = new Family();
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.cols = [
            { field: "familyMemberName", header: "Family Member Name" },
            { field: "relation", header: "Relation" },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.family = new Family();
    }
    save() {
        this.families.push(this.family);
        this.displayBasic = false;
        this.family = new Family();
    }
}
