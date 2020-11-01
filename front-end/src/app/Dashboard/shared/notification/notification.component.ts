import { Router } from "@angular/router";
import { NotificationsService } from "./../../patients/services/notifications.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
    notifications = [];
    notificationCount = 0;
    loggedInUser;
    constructor(
        private notificationsService: NotificationsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(localStorage.getItem("user"));
        this.getALlNotifications();
        this.getNotificationsCount();
        setInterval(() => {
            this.getALlNotifications();
            this.getNotificationsCount();
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
        for (const element of this.loggedInUser.teams) {
            this.notificationsService
                .getAllNotifications(element.id)
                .subscribe(async (result) => {
                    if (result && result.length > 0) {
                        result.forEach((res) => {
                            if (res.teamOwnerId === this.loggedInUser.id) {
                                markAsRead = true;
                            } else {
                                markAsRead = false;
                            }
                            let obj = {
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
                });
        }
    }
    getNotificationsCount() {
        const selectedUser = JSON.parse(localStorage.getItem("user"));
        for (const element of selectedUser.teams) {
            this.notificationsService
                .getNotificationsCount(element.id)
                .subscribe((result) => {
                    this.notificationCount += result.count;
                });
        }
    }
}
