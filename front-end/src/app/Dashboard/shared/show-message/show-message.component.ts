import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-show-message",
    templateUrl: "./show-message.component.html",
    styleUrls: ["./show-message.component.css"],
    providers: [MessageService],
})
export class ShowMessageComponent implements OnInit {
    constructor(private messageService: MessageService) {}
    ngOnInit(): void {}
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
}
