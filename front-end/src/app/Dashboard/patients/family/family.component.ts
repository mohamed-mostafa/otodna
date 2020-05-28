import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Family } from "./family";

@Component({
    selector: "app-family",
    templateUrl: "./family.component.html",
    styleUrls: ["./family.component.css"],
    providers: [MessageService],
})
export class FamilyComponent implements OnInit {
    cols: any[];
    families: any[] = [];
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    showPagination = false;
    family: Family = new Family();
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            { label: "Patients" },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
            },
        ];
        this.cols = [
            { field: "familyMemberName", header: "Family Member Name" },
            { field: "relation", header: "Relation" },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.family = new Family();
    }
    save() {
        this.validateFamily((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                setTimeout(() => {
                    this.families.push(this.family);
                    this.showPagination = true;
                    this.displayBasic = false;
                    this.family = new Family();
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
            life: 1000,
        });
    }
    validateFamily(callback) {
        if (!this.family.familyMemberName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Family member name is required"
            );
            return false;
        }
        if (!this.family.relation) {
            this.showMessage(
                "error",
                "Validation Error",
                "relation is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
}
