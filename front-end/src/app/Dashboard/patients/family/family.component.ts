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
    relations: any[] = [];
    familyMemberRelation;
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
        this.family.patientId = this.selectedPatient.id;
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
        this.getAllPatientMemberRelationType();
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
            .getAllFamilies(this.family.patientId)
            .subscribe(async (result) => {
                this.families = await this.getPatientMemberRelationTypeById(
                    result
                );
                this.showTable();
                this.spinner.hide();
            });
    }
    getAllPatientMemberRelationType() {
        this.spinner.show();
        this.familyService
            .getAllPatientMemberRelationType()
            .subscribe(async (result) => {
                this.relations = result;
                this.spinner.hide();
            });
    }
    getPatientMemberRelationTypeById(families) {
        families.forEach((fam) => {
            this.familyService
                .getPatientMemberRelationTypeById(
                    fam.familyMemberRelationTypeId
                )
                .subscribe((res) => {
                    fam.relationName = res.name;
                });
        });
        return families;
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.family = new Family();
    }
    reset() {
        this.family = new Family();
        this.family.patientId = this.selectedPatient.id;
        this.familyMemberRelation = "";
    }
    save() {
        this.validateFamily((callback) => {
            if (callback === "valid") {
                this.family.familyMemberRelationTypeId = this.familyMemberRelation.id;
                this.spinner.show();
                this.familyService
                    .createFamilyMember(this.family)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlFamilies();
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
    validateFamily(callback) {
        if (!this.family.familyMemberName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Family member name is required"
            );
            return false;
        }
        if (!this.familyMemberRelation) {
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
