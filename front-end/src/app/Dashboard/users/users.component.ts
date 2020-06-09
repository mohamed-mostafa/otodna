import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { User } from "./user";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"],
    providers: [MessageService],
})
export class UsersComponent implements OnInit {
    cols: any[];
    users: any[];
    user: User = new User();
    selectedUser;
    displayBasic: boolean;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: "username", header: "Username" },
            { field: "email", header: "Email" },
        ];
        this.users = [
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
    editUser(selected) {
        this.user = selected;
        this.displayBasic = true;
    }
    save() {
        this.spinner.show();
        setTimeout(() => {
            this.displayBasic = false;
            this.user = new User();
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
}
