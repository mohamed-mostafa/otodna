import { Member } from "./member";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { TeamsService } from "../../services/teams.service";
import { UsersService } from "../../services/users.service";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-team-members",
    templateUrl: "./team-members.component.html",
    styleUrls: ["./team-members.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class TeamMembersComponent implements OnInit {
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    items: MenuItem[];
    member: Member = new Member();
    home: MenuItem;
    members: any[];
    users: any[];
    apiLink = "members";
    selectedTeam;
    displayMemberDialog: boolean;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private teamsService: TeamsService,
        private usersService: UsersService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
        this.items = [
            { label: "Teams" },
            {
                label: "My Teams",
                command: (event) => {
                    this.goToMyTeamsPage(event);
                },
            },
            { label: this.selectedTeam.name },
        ];
        this.home = { icon: "fa fa-users" };

        this.getAllUsers();
        this.getAllMembers();
    }
    checkAddedMember() {
        this.members.forEach((member) => {
            this.users = this.users.filter((user) => user.id !== member.id);
        });
    }
    getAllMembers() {
        this.spinner.show();
        this.teamsService
            .getTeamMembers(this.selectedTeam.id)
            .subscribe((result) => {
                this.members = result;
                this.checkAddedMember();
                this.spinner.hide();
            });
    }
    getAllUsers() {
        this.spinner.show();
        this.usersService.getAllApprovedUsers().subscribe((result) => {
            this.users = result;
            this.spinner.hide();
        });
    }
    goToMyTeamsPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/myTeams"]);
            });
    }
    deleteMember(selected) {
        if (selected.id === this.selectedTeam.ownerId) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "You Cannot Delete Team Owner"
            );
        } else {
            this.confirmationService.confirm({
                message: "Do you want to delete this member?",
                header: "Delete Member Confirmation",
                icon: "pi pi-info-circle",
                accept: () => {
                    this.spinner.show();
                    this.teamsService
                        .deleteTeamMember(this.selectedTeam.id, selected.id)
                        .subscribe(() => {
                            this.spinner.hide();
                            this.ngOnInit();
                        });
                    this.showMessageComponent.showMessage(
                        "success",
                        "Confirmed",
                        "Member has been deleted"
                    );
                },
            });
        }
    }
    openMemberDialog() {
        this.displayMemberDialog = true;
    }
    saveMember() {
        this.validateMemberDialog((callback) => {
            if (callback === "valid") {
                this.member.user_id = this.member.member.id;
                this.teamsService
                    .createTeamMember(this.selectedTeam.id, this.member.user_id)
                    .subscribe((u) => {
                        this.member = new Member();
                        this.getAllMembers();
                        this.displayMemberDialog = false;
                        this.spinner.hide();
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
    validateMemberDialog(callback) {
        if (!this.member.member) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Member name is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
}
