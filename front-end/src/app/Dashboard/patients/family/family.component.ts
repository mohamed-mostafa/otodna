import { PatientService } from "./../services/patient.service";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
import { FamilyService } from "./../services/family.service";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
import { Family } from "./family";
import { SharedClass } from "../shared/sharedFunctions";
@Component({
    selector: "app-family",
    templateUrl: "./family.component.html",
    styleUrls: ["./family.component.css"],
})
export class FamilyComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    cols: any[];
    families: any[] = [];
    relations: any[] = [];
    familyMemberRelation;
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
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.family.patientId = this.selectedPatient.id;
        this.cols = [
            { field: "familyMemberName", header: "Family Member Name" },
            { field: "relation", header: "Relation" },
        ];
        this.getALlFamilies();
        this.getAllPatientMemberRelationType();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
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
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
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
                        this.showMessageComponent.showMessage(
                            "success",
                            "Updated",
                            "Data updated successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    validateFamily(callback) {
        if (!this.family.familyMemberName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Family member name is required"
            );
            return false;
        }
        if (!this.familyMemberRelation) {
            this.showMessageComponent.showMessage(
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
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Family member has been deleted"
                );
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
