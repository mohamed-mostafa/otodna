import { ReferralPatient } from "./referral-patient";
import { TeamsService } from "./../../services/teams.service";
import { DepartmentsService } from "./../../services/departments.service";
import { ReferralsService } from "./../services/referrals.service";
import { SharedClass } from "./../shared/sharedFunctions";
import { PatientService } from "./../services/patient.service";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
@Component({
    selector: "app-referrals",
    templateUrl: "./referrals.component.html",
    styleUrls: ["./referrals.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class ReferralsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    referrals: any[] = [];
    displayBasic: boolean;
    referralPatient: ReferralPatient = new ReferralPatient();
    selectedPatient;
    showSaveButton = true;
    showAllButtons = true;
    allTeams = [];
    departments: any[];
    department = "";
    cogsItems = [];
    constructor(
        private messageService: MessageService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private patientService: PatientService,
        private referralsService: ReferralsService,
        private teamsService: TeamsService,
        private departmentsService: DepartmentsService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.referralPatient.patientId = this.selectedPatient.id;
        this.getAllDepartments();
        this.getALlReferrals();
        this.getAllTeams();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
    }
    getALlReferrals() {
        this.spinner.show();
        this.referralsService
            .getAllReferrals(this.referralPatient.patientId)
            .subscribe(async (result) => {
                this.referrals = await this.getTeamNameById(result);
                this.spinner.hide();
            });
    }
    getAllTeams() {
        this.spinner.show();
        this.teamsService.getAllTeams().subscribe(async (result) => {
            result.forEach(async (element) => {
                element.departmentName = await this.getDepartmentById(
                    element.departmentId
                );
                element.displayName = `${element.name}-${element.departmentName}`;
            });
            this.allTeams = result;
            this.spinner.hide();
        });
    }
    showDialog() {
        this.displayBasic = true;
    }
    cancel() {
        this.displayBasic = false;
        this.referralPatient = new ReferralPatient();
    }
    reset() {
        this.displayBasic = false;
        this.referralPatient = new ReferralPatient();
        this.referralPatient.patientId = this.selectedPatient.id;
        this.department = "";
    }
    save() {
        if (!this.referralPatient.teamId) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Team is required"
            );
            return false;
        } else {
            this.spinner.show();
            this.referralPatient.teamId = this.referralPatient.teamId.id;
            this.referralPatient.patientId = this.selectedPatient.id;
            this.referralPatient.patientName = `${this.selectedPatient.firstName} ${this.selectedPatient.lastName}`;
            this.referralPatient.date = new Date();
            this.referralsService
                .createReferral(this.referralPatient)
                .subscribe((u: any) => {
                    this.reset();
                    this.getALlReferrals();
                    this.spinner.hide();
                    this.showMessageComponent.showMessage(
                        "success",
                        "Saved",
                        "Data saved successfully"
                    );
                });
        }
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    deleteReferral(referralPatient) {
        this.confirmationService.confirm({
            message: "Do you want to delete this referral?",
            header: "Delete Referral Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.referralsService
                    .deleteReferral(referralPatient.id)
                    .subscribe((u: any) => {
                        this.getALlReferrals();
                        this.spinner.hide();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Referral has been deleted"
                );
            },
            reject: () => {
                this.showMessageComponent.showMessage(
                    "info",
                    "Rejected",
                    "You have rejected"
                );
            },
        });
    }
    async viewData(data) {
        this.showSaveButton = false;
        this.displayBasic = true;
        let result: any;
        if (typeof data.teamId == "object") {
            result = await this.getTeamById(data.teamId.id);
        } else {
            result = await this.getTeamById(data.teamId);
        }
        this.referralPatient = data;
        result.departmentName = await this.getDepartmentById(
            result.departmentId
        );
        result.displayName = `${result.name}-${result.departmentName}`;
        this.referralPatient.teamId = result;
    }
    getTeamById(id) {
        return new Promise((resolve) => {
            this.teamsService.getTeamById(id).subscribe((result) => {
                resolve(result);
            });
        });
    }
    getTeamNameById(referrals) {
        referrals.forEach((refer) => {
            this.teamsService.getTeamById(refer.teamId).subscribe((result) => {
                refer.teamName = result.name;
            });
        });
        return referrals;
    }
    onHide() {
        this.reset();
        this.showSaveButton = true;
    }
    getAllDepartments() {
        this.spinner.show();
        this.departmentsService.getAllDepartments().subscribe((result) => {
            this.departments = result;
            this.spinner.hide();
        });
    }
    getDepartmentById(id) {
        const result = this.departments.find(
            (department) => department.id === id
        );
        this.department = result.name;
        return this.department;
    }
    onClickMenu(data: any) {
        this.cogsItems = [
            {
                label: "Deactivate",
                icon: "fa fa-ban",
                command: () => {
                    this.deactivate(data);
                },
                visible: data.active === "true",
            },
            {
                label: "Activate",
                icon: "fa fa-check",
                command: () => {
                    this.activate(data);
                },
                visible: data.active === "false",
            },
        ];
    }
    deactivate(referral) {
        referral.active = "false";
        delete referral.teamName;
        referral.date = new Date();
        if (referral.referralMessage === null) {
            delete referral.referralMessage;
        }
        this.referralsService.updateReferral(referral).subscribe((u: any) => {
            this.reset();
            this.getALlReferrals();
            this.spinner.hide();
            this.showMessageComponent.showMessage(
                "success",
                "De Activated",
                "Data deactivated successfully"
            );
        });
    }
    activate(referral) {
        referral.active = "true";
        delete referral.teamName;
        referral.date = new Date();
        if (referral.referralMessage === null) {
            delete referral.referralMessage;
        }
        this.referralsService.updateReferral(referral).subscribe((u: any) => {
            this.reset();
            this.getALlReferrals();
            this.spinner.hide();
            this.showMessageComponent.showMessage(
                "success",
                "Activated",
                "Data activated successfully"
            );
        });
    }
}
