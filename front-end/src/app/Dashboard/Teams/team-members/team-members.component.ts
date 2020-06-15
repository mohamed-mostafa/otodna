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
    selectedTeam;
    displayMemberDialog: boolean;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private confirmationService: ConfirmationService,
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
        this.members = [
            {
                name: "Alaa Darwish",
                role: "Doctor",
            },
            {
                name: "Mohamed Mostafa",
                role: "Consultant",
            },
            {
                name: "Aya Mahmoud",
                role: "Nurse",
            },
        ];
        this.users = [
            {
                name: "Ali Mahmoud",
                role: "Doctor",
            },
            {
                name: "Ahmed Saleh",
                role: "Doctor",
            },
            {
                name: "Mariem Ali",
                role: "Nurse",
            },
            {
                name: "Esraa Ahmed",
                role: "Nurse",
            },
            {
                name: "Eslam Zaki",
                role: "Consultant",
            },
            {
                name: "Ahlam Salah",
                role: "Doctor",
            },
            {
                name: "Osama Mohamed",
                role: "Doctor",
            },
            {
                name: "Layla Radwan",
                role: "Nurse",
            },
        ];
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
                this.spinner.show();
                setTimeout(() => {
                    this.displayMemberDialog = false;
                    this.members.push(this.member);
                    this.member = new Member();
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
    validateMemberDialog(callback) {
        if (!this.member.name) {
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
