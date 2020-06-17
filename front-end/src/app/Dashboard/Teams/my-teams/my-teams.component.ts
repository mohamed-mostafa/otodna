import { PublicServiceService } from "./../../public-service.service";
import { Router } from "@angular/router";
import { Team } from "./team";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit, NgZone } from "@angular/core";

@Component({
    selector: "app-my-teams",
    templateUrl: "./my-teams.component.html",
    styleUrls: ["./my-teams.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class MyTeamsComponent implements OnInit {
    departments: any[];
    teams: any[];
    users: any[];
    team: Team = new Team();
    displayTeamDialog: boolean;
    readonly = true;
    apiLink = "teams";
    loggedInUser;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private ngZone: NgZone,
        private publicService: PublicServiceService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(localStorage.getItem("user"));
        this.team.ownerId = this.loggedInUser.id;
        this.team.owner = this.loggedInUser.fullName;
        this.getAllUsers();
        this.getAllDepartments();
        this.getAllTeams();
    }
    getAllTeams() {
        this.spinner.show();
        this.publicService.getAllData(this.apiLink).subscribe((result) => {
            this.teams = result;
            this.spinner.hide();
        });
    }
    getAllDepartments() {
        this.spinner.show();
        this.publicService.getAllData("departments").subscribe((result) => {
            this.departments = result;
            this.spinner.hide();
        });
    }
    getDepartmentById(id) {
        const result = this.departments.find(
            (department) => department.id === id
        );
        return result.name;
    }
    getAllUsers() {
        this.spinner.show();
        this.publicService.getAllData("users").subscribe((result) => {
            this.users = result;
            this.spinner.hide();
        });
    }
    getUserById(id) {
        const result = this.users.find((user) => user.id === id);
        return result.fullName;
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    saveTeam() {
        this.validateTeamDialog((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.team.departmentId = this.team.department.id;
                delete this.team.owner;
                delete this.team.department;
                this.publicService
                    .createData(this.team, this.apiLink)
                    .subscribe((u) => {
                        this.reset();
                        this.getAllTeams();
                        this.displayTeamDialog = false;
                        this.spinner.hide();
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
    reset() {
        this.team = new Team();
        this.team.ownerId = this.loggedInUser.id;
        this.team.owner = this.loggedInUser.fullName;
    }
    openTeamDialog() {
        this.displayTeamDialog = true;
    }
    validateTeamDialog(callback) {
        if (!this.team.name) {
            this.showMessage(
                "error",
                "Validation Error",
                "Team name is required"
            );
            return false;
        }
        if (!this.team.owner) {
            this.showMessage("error", "Validation Error", "Owner is required");
            return false;
        }
        if (!this.team.department) {
            this.showMessage(
                "error",
                "Validation Error",
                "Department is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    deleteTeam(selected) {
        this.confirmationService.confirm({
            message: "Do you want to delete this team?",
            header: "Delete Team Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.publicService
                    .deleteData(selected.id, this.apiLink)
                    .subscribe(() => {
                        this.spinner.hide();
                        this.getAllTeams();
                    });
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Team has been deleted"
                );
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    openTeamMember(selected) {
        localStorage.setItem("selectedTeam", JSON.stringify(selected));
        this.ngZone.run(() => {
            this.router.navigate(["/dashboard/teamMembers"]);
        });
    }
}
