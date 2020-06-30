import { filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
    styleUrls: ["./app.menu.component.css"],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    otherMenu: any[];
    showMainMenu = true;
    routesArray;
    disabledMenuItem;
    showOtherMenu = false;
    constructor(public app: DashboardComponent, private router: Router) {}

    ngOnInit() {
        let selectedUser = JSON.parse(localStorage.getItem("user"));
        console.log(selectedUser);
        console.log(selectedUser.type.name);
        console.log(selectedUser.role.name);
        this.model = [
            {
                label: "PATIENTS",
                icon: "fa fa-fw fa-users",
                routerLink: ["/dashboard/search"],
                items: [
                    {
                        label: "Search",
                        icon: "fa fa-fw fa-search",
                        routerLink: ["/dashboard/search"],
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
                routerLink: ["/dashboard/myTeams"],
                // disabled: true,
                items: [
                    {
                        label: "My Teams",
                        icon: "fa fa-fw fa-users",
                        routerLink: ["myTeams"],
                    },
                ],
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
        if (this.router.url === "/dashboard") {
            localStorage.removeItem("selectedPatient");
        }
        if (
            this.router.url === "/dashboard/addDiagnosis" ||
            this.router.url === "/dashboard/diagnosisTests" ||
            this.router.url === "/dashboard/diagnosisPathology" ||
            this.router.url === "/dashboard/diagnosisCandidacy"
        ) {
            this.routesArray = [
                "addDiagnosis",
                "diagnosisTests",
                "diagnosisPathology",
                "diagnosisCandidacy",
            ];
            this.otherMenu = [
                {
                    label: "Basic Info",
                    icon: "fa fa-fw fa-stethoscope",
                    routerLink: ["addDiagnosis"],
                },
                {
                    label: "Tests",
                    icon: "fa fa-fw fa-flask",
                    routerLink: ["diagnosisTests"],
                },
                {
                    label: "Pathology",
                    icon: "fa fa-fw fa-book",
                    routerLink: ["diagnosisPathology"],
                },
                {
                    label: "Candidacy",
                    icon: "fa fa-fw fa-stethoscope",
                    routerLink: ["diagnosisCandidacy"],
                },
            ];
        } else if (this.router.url === "/dashboard/addTreatment") {
            this.routesArray = ["addTreatment"];
            this.otherMenu = [
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
                    label: "Followup",
                    icon: "fa fa-fw fa-info",
                    routerLink: ["addFollowup"],
                },
            ];
        } else {
            this.routesArray = [
                "patient",
                "family",
                "vital",
                "allergies",
                "labResults",
                "immunizations",
                "medications",
                "problems",
                "patientHistory",
            ];
            let selectedPatient = JSON.parse(
                localStorage.getItem("selectedPatient")
            );
            if (!selectedPatient) {
                this.otherMenu = [
                    {
                        label: "Basic Information",
                        icon: "fa fa-fw fa-info",
                        routerLink: ["patient"],
                    },
                    {
                        label: "Family",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Vital",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Allergies",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Lab Results",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Immunizations",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Medications",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Problems",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                    {
                        label: "Patient History",
                        icon: "fa fa-fw fa-lock",
                        styleClass: "menuCss",
                    },
                ];
            } else {
                this.otherMenu = [
                    {
                        label: "Basic Information",
                        icon: "fa fa-fw fa-info",
                        routerLink: ["patient"],
                    },
                    {
                        label: "Family",
                        icon: "fa fa-fw fa-users",
                        routerLink: ["family"],
                    },
                    {
                        label: "Vital",
                        icon: "fa fa-fw fa-star",
                        routerLink: ["vital"],
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
            this.otherMenu = this.otherMenu.filter(
                (item) => item.disabled !== true
            );
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
