import { Member } from "./member";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-my-teams",
    templateUrl: "./my-teams.component.html",
    styleUrls: ["./my-teams.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class MyTeamsComponent implements OnInit {
    cols: any[];
    members: any[];
    member: Member = new Member();
    selectedUser;
    showTable = false;
    displayBasic: boolean;
    displaySave = false;
    readonly = true;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: "username", header: "Username" },
            { field: "email", header: "Email" },
        ];
        this.members = [
            { username: "Alaa Darwish", email: "alaa@gmail.com" },
            { username: "Ahmed Mahmoud", email: "ahmed@gmail.com" },
            { username: "Maha Ahmed", email: "maha@gmail.com" },
            { username: "Mohamed Mostafa", email: "mostafa@gmail.com" },
            { username: "Amr Hassan", email: "amr@gmail.com" },
            { username: "Aya Ali", email: "aya@gmail.com" },
            { username: "Mariem Mahmoud", email: "mariem@gmail.com" },
            { username: "Toka Ahmed", email: "toka@gmail.com" },
            { username: "Hatem Mohamed", email: "hatem@gmail.com" },
            { username: "Eslam Ashref", email: "elslam@gmail.com" },
            { username: "Omnia Mohamed", email: "omnia@gmail.com" },
            { username: "Yones Salah", email: "yones@gmail.com" },
        ];
    }
    showMembers() {
        this.showTable = true;
    }
    editMember(selected) {
        this.member = selected;
        this.readonly = true;
        this.displaySave = false;
        this.displayBasic = true;
    }
    addMember() {
        this.readonly = false;
        this.displaySave = true;
        this.member = new Member();
        this.displayBasic = true;
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.displayBasic = false;
            this.members.push(this.member);
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
    }
    cancel() {
        this.displayBasic = false;
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 1000,
        });
    }
    deleteMember(selected) {
        this.confirmationService.confirm({
            message: "Do you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.members = this.members.filter((item) => item !== selected);
                this.showMessage("info", "Confirmed", "Record deleted");
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
}
