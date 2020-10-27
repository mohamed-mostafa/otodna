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
        this.getALlReferrals();
        this.getAllTeams();
        this.getAllDepartments();
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
        this.teamsService.getAllTeams().subscribe((result) => {
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
    update() {
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
            delete this.referralPatient.teamName;
            this.referralsService
                .updateReferral(this.referralPatient)
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
        let result: any = await this.getTeamById(data.teamId);
        this.referralPatient = data;
        this.referralPatient.teamId = result;
        this.getDepartmentById(result.departmentId);
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
    onSelectTeam(event) {
        this.getDepartmentById(event.value.departmentId);
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
    }
}
