import { ShowMessageComponent } from "./../show-message/show-message.component";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { NotificationsService } from "./../../patients/services/notifications.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.css"],
    providers: [MessageService],
})
export class NotificationComponent implements OnInit {
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    notifications = [];
    notificationCount = 0;
    loggedInUser;
    constructor(
        private notificationsService: NotificationsService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(localStorage.getItem("user"));
        this.getALlNotifications();
        setInterval(() => {
            this.getALlNotifications();
            this.notifications = [];
            this.notificationCount = 0;
        }, 30000);
    }
    selectedNotification(data) {
        if (data.teamOwnerId === this.loggedInUser.id) {
            data.seen = "true";
            this.notificationsService
                .updateNotification(data)
                .subscribe((u: any) => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () =>
                        false;
                    this.router.onSameUrlNavigation = "reload";
                    this.router.navigate([this.router.url]);
                    this.getALlNotifications();
                });
        }
    }
    getALlNotifications() {
        let markAsRead = false;
        this.notificationsService
            .getAllNotificationsByTeams(this.loggedInUser.teams)
            .subscribe(
                async (result) => {
                    const data: any = result;
                    if (data && data.length > 0) {
                        data.forEach((res) => {
                            if (res.teamOwnerId === this.loggedInUser.id) {
                                markAsRead = true;
                            } else {
                                markAsRead = false;
                            }
                            const obj = {
                                label: res.notificationText,
                                icon: markAsRead ? "fa fa-eye" : "",
                                command: () => {
                                    this.selectedNotification(res);
                                },
                                styleClass: markAsRead ? "menuItemCss" : "",
                            };
                            this.notifications.push(obj);
                        });
                    }
                    this.notificationCount = this.notifications.length;
                },
                async (error) => {
                    console.log(error);
                    this.showMessageComponent.showMessage(
                        "error",
                        "Error Message",
                        error.message
                    );
                }
            );
    }
}
