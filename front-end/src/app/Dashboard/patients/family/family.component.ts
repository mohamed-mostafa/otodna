import { FamilyService } from "./../services/family.service";
import { Router } from "@angular/router";
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
    showTableFlag = false;
    family: Family = new Family();
    selectedPatient;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private familyService: FamilyService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
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
            { field: "familyMemberName", header: "Family Member Name" },
            { field: "relation", header: "Relation" },
        ];
        this.home = { icon: "fa fa-user-md" };
        this.getALlFamilies();
        this.showTable();
    }
    showTable() {
        if (this.families.length > 0) {
            this.showTableFlag = true;
        }
    }
    getALlFamilies() {
        this.spinner.show();
        this.familyService
            .getAllFamilies(this.selectedPatient.id)
            .subscribe(async (result) => {
                this.families = result;
                this.showTable();
                this.spinner.hide();
            });
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
                    this.displayBasic = false;
                    this.family = new Family();
                    this.showTable();
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
            life: 3000,
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
        if (!this.family.familyMemberRelationTypeId) {
            this.showMessage(
                "error",
                "Validation Error",
                "Family Member Relation Type is required"
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
}
