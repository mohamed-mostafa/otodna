import { FamilyService } from "./../services/family.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Family } from "./family";
import { SharedClass } from "../shared/sharedFunctions";
@Component({
    selector: "app-family",
    templateUrl: "./family.component.html",
    styleUrls: ["./family.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class FamilyComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
    cols: any[];
    families: any[] = [];
    relations: any[] = [];
    familyMemberRelation;
    items: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    family: Family = new Family();
    selectedPatient;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private familyService: FamilyService,
        private confirmationService: ConfirmationService,
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
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient.teamId
        );
    }
    getALlFamilies() {
        this.spinner.show();
        this.familyService
            .getAllFamilies(this.family.patientId)
            .subscribe(async (result) => {
                this.families = await this.getPatientMemberRelationTypeById(
                    result
                );
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
    update() {
        this.validateFamily((callback) => {
            if (callback === "valid") {
                this.family.familyMemberRelationTypeId = this.familyMemberRelation.id;
                delete this.family.relationName;
                this.spinner.show();
                this.familyService
                    .updateFamilyMember(this.family)
                    .subscribe((u: any) => {
                        this.displayBasic = false;
                        this.spinner.hide();
                        this.getALlFamilies();
                        this.reset();
                        this.showMessage(
                            "success",
                            "Updated",
                            "Data updated successfully"
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
        this.sharedClass.goToDashboard(this.router);
    }
    deleteFamilyMember(family) {
        this.confirmationService.confirm({
            message: "Do you want to delete this family member?",
            header: "Delete Family Member Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.familyService
                    .deleteFamilyMember(family.id)
                    .subscribe((u: any) => {
                        this.getALlFamilies();
                        this.spinner.hide();
                    });
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Family member has been deleted"
                );
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    viewData(data) {
        this.showSaveButton = false;
        this.displayBasic = true;
        const found = this.relations.find(
            (r) => data.familyMemberRelationTypeId === r.id
        );
        this.familyMemberRelation = found;
        this.family = data;
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
}
