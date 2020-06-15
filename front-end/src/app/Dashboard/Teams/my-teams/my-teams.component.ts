import { Router } from "@angular/router";
import { Team } from "./team";
import { Member } from "./member";
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
    member: Member = new Member();
    team: Team = new Team();
    displayTeamDialog: boolean;
    readonly = true;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private ngZone: NgZone,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.teams = [
            {
                name: "Dr.Alaa Team",
                owner: "Alaa Darwish",
                department: "Speech",
            },
            {
                name: "Dr.Mostafa Team",
                owner: "Mohamed Mostafa",
                department: "Otology",
            },
            {
                name: "Dr.Ahmed Team",
                owner: "Ahmed Abdallah",
                department: "Audiology",
            },
        ];
        this.departments = [
            { name: "Otology" },
            { name: "Audiology" },
            { name: "Speech" },
        ];
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
                setTimeout(() => {
                    let departmentName: any = this.team.department;
                    this.team.department = departmentName.name;
                    this.displayTeamDialog = false;
                    this.teams.push(this.team);
                    this.team = new Team();
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
                this.teams = this.teams.filter((item) => item !== selected);
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
