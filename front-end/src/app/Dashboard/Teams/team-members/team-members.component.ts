import { PublicServiceService } from "./../../public-service.service";
import { Member } from "./member";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-team-members",
    templateUrl: "./team-members.component.html",
    styleUrls: ["./team-members.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class TeamMembersComponent implements OnInit {
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
        private publicService: PublicServiceService,
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

        this.getAllMembers();
        this.getAllUsers();
    }
    getAllMembers() {
        this.spinner.show();
        this.publicService
            .getAllData(`teams/${this.selectedTeam.id}/members`)
            .subscribe((result) => {
                this.members = result;
                console.log(this.members);

                this.spinner.hide();
            });
    }
    getAllUsers() {
        this.spinner.show();
        this.publicService.getAllData("users").subscribe((result) => {
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
        this.confirmationService.confirm({
            message: "Do you want to delete this member?",
            header: "Delete Member Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.members = this.members.filter((item) => item !== selected);
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Member has been deleted"
                );
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
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
    openMemberDialog() {
        this.displayMemberDialog = true;
    }
    saveMember() {
        this.validateMemberDialog((callback) => {
            if (callback === "valid") {
                this.member.user_id = this.member.member.id;
                console.log(this.member.user_id);
                console.log(this.selectedTeam.id);

                this.publicService
                    .createData(
                        this.member.user_id,
                        `teams/${this.selectedTeam.id}/member`
                    )
                    .subscribe((u) => {
                        this.member = new Member();
                        this.getAllMembers();
                        this.displayMemberDialog = false;
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
    validateMemberDialog(callback) {
        if (!this.member.member) {
            this.showMessage(
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
