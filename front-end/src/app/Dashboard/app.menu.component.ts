import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
    model: any[];
    otherMenu: any[];
    showMainMenu = true;
    routesArray;
    showOtherMenu = false;
    constructor(public app: DashboardComponent, private router: Router) {}

    ngOnInit() {
        this.model = [
            {
                label: "PATIENTS",
                icon: "fa fa-fw fa-users",
                routerLink: ["/dashboard"],
                items: [
                    {
                        label: "Search",
                        icon: "fa fa-fw fa-search",
                        routerLink: ["/dashboard"],
                    },
                    {
                        label: "New Patient",
                        icon: "fa fa-fw fa-plus-circle",
                        routerLink: ["patient"],
                    },
                ],
            },
            {
                label: "REPORTS",
                icon: "fa fa-fw fa-area-chart",
                items: [],
            },
            {
                label: "TEAMS",
                icon: "fa fa-fw fa-user-md",
                items: [],
            },
            {
                label: "SETTINGS",
                icon: "fa fa-fw fa-cogs",
                routerLink: ["/dashboard/users"],
                items: [
                    {
                        label: "Users",
                        icon: "fa fa-fw fa-users",
                        routerLink: ["users"],
                    },
                ],
            },
        ];
        this.setMenuData();
    }
    setMenuData() {
        if (this.router.url === "/dashboard/addDiagnosis") {
            this.routesArray = ["addDiagnosis"];
            this.otherMenu = [
                {
                    label: "DASHBOARD",
                    icon: "fa fa-fw fa-dashboard",
                    routerLink: ["/dashboard"],
                },
                {
                    label: "Diagnosis",
                    icon: "fa fa-fw fa-info",
                    routerLink: ["addDiagnosis"],
                },
            ];
        } else if (this.router.url === "/dashboard/addTreatment") {
            this.routesArray = ["addTreatment"];
            this.otherMenu = [
                {
                    label: "DASHBOARD",
                    icon: "fa fa-fw fa-dashboard",
                    routerLink: ["/dashboard"],
                },
                {
                    label: "Treatment",
                    icon: "fa fa-fw fa-info",
                    routerLink: ["addTreatment"],
                },
            ];
        } else if (this.router.url === "/dashboard/addFollowup") {
            this.routesArray = ["addFollowup"];
            this.otherMenu = [
                {
                    label: "DASHBOARD",
                    icon: "fa fa-fw fa-dashboard",
                    routerLink: ["/dashboard"],
                },
                {
                    label: "Followup",
                    icon: "fa fa-fw fa-info",
                    routerLink: ["addFollowup"],
                },
            ];
        } else {
            this.routesArray = [
                "patient",
                "editPatient",
                "family",
                "vital",
                "allergies",
                "labResults",
                "immunizations",
                "medications",
                "problems",
                "patientHistory",
            ];
            this.otherMenu = [
                {
                    label: "DASHBOARD",
                    icon: "fa fa-fw fa-dashboard",
                    routerLink: ["/dashboard"],
                },
                {
                    label: "Basic Information",
                    icon: "fa fa-fw fa-info",
                    routerLink: ["patient"],
                },
                {
                    label: "Family",
                    icon: "fa fa-fw fa-users",
                    routerLink: ["family"],
                    disabled: true,
                },
                {
                    label: "Vital",
                    icon: "fa fa-fw fa-star",
                    routerLink: ["vital"],
                    visible: false,
                },
                {
                    label: "Allergies",
                    icon: "fa fa-fw fa-user-md",
                    routerLink: ["allergies"],
                },
                {
                    label: "Lab Results",
                    icon: "fa fa-fw fa-flask",
                    routerLink: ["labResults"],
                },
                {
                    label: "Immunizations",
                    icon: "fa fa-fw fa-medkit",
                    routerLink: ["immunizations"],
                },
                {
                    label: "Medications",
                    icon: "fa fa-fw fa-heartbeat",
                    routerLink: ["medications"],
                },
                {
                    label: "Problems",
                    icon: "fa fa-fw fa-exclamation-triangle",
                    routerLink: ["problems"],
                },
                {
                    label: "Patient History",
                    icon: "fa fa-fw fa-history",
                    routerLink: ["patientHistory"],
                },
            ];
        }
        for (const route of this.routesArray) {
            if (this.router.url === `/dashboard/${route}`) {
                this.showMainMenu = false;
                this.showOtherMenu = true;
                break;
            } else {
                this.showMainMenu = true;
                this.showOtherMenu = false;
            }
        }
    }
    changeTheme(theme: string) {
        const layoutLink: HTMLLinkElement = document.getElementById(
            "layout-css"
        ) as HTMLLinkElement;
        layoutLink.href =
            "assets/layout/css/layout-" + theme.split("-")[0] + ".css";
        const themeLink: HTMLLinkElement = document.getElementById(
            "theme-css"
        ) as HTMLLinkElement;
        themeLink.href = "assets/theme/" + "theme-" + theme + ".css";
    }

    changeTopbarColor(topbarColor, logo) {
        this.app.topbarColor = topbarColor;
        const topbarLogoLink: HTMLImageElement = document.getElementById(
            "topbar-logo"
        ) as HTMLImageElement;
        topbarLogoLink.src = "assets/layout/images/" + logo + ".png";
    }

    onMenuClick(event) {
        if (!this.app.isHorizontal()) {
        } else {
            this.app.onMenuClick(event);
        }
        this.setMenuData();
    }
}
