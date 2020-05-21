import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
    model: any[];
    patientMenu: any[];
    showMainMenu = true;
    patientArray;
    showPatientMenu = false;
    constructor(public app: DashboardComponent, private router: Router) {}

    ngOnInit() {
        this.patientArray = [
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
        this.model = [
            // {
            //     label: "DASHBOARD",
            //     icon: "fa fa-fw fa-dashboard",
            //     routerLink: ["/dashboard"],
            // },
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
            // {
            //     label: "TOPBAR COLORS",
            //     icon: "fa fa-fw fa-magic",
            //     badge: 10,
            //     items: [
            //         {
            //             label: "Light",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-light",
            //                     "logo-olympia"
            //                 ),
            //         },
            //         {
            //             label: "Dark",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-dark",
            //                     "logo-olympia-white"
            //                 ),
            //         },
            //         {
            //             label: "Blue-Grey",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-bluegrey",
            //                     "logo-olympia-white"
            //                 ),
            //         },
            //         {
            //             label: "Purple",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-purple",
            //                     "logo-olympia-white"
            //                 ),
            //         },
            //         {
            //             label: "Cyan",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-cyan",
            //                     "logo-olympia-white"
            //                 ),
            //         },
            //         {
            //             label: "Pink",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-pink",
            //                     "logo-olympia-white"
            //                 ),
            //         },
            //         {
            //             label: "Teal",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-teal",
            //                     "logo-olympia-white"
            //                 ),
            //         },
            //         {
            //             label: "Yellow",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-yellow",
            //                     "logo-olympia"
            //                 ),
            //         },
            //         {
            //             label: "Lime",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-lime",
            //                     "logo-olympia"
            //                 ),
            //         },
            //         {
            //             label: "Green",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) =>
            //                 this.changeTopbarColor(
            //                     "layout-topbar-green",
            //                     "logo-olympia"
            //                 ),
            //         },
            //     ],
            // },
            // {
            //     label: "MENU COLORS",
            //     icon: "fa fa-fw fa-list",
            //     items: [
            //         {
            //             label: "Light",
            //             icon: "fa fa-fw fa-circle-o",
            //             command: (event) => (this.app.lightMenu = true),
            //         },
            //         {
            //             label: "Dark",
            //             icon: "fa fa-fw fa-circle",
            //             command: (event) => (this.app.lightMenu = false),
            //         },
            //     ],
            // },
            // {
            //     label: "LAYOUTS",
            //     icon: "fa fa-fw fa-desktop",
            //     items: [
            //         {
            //             label: "Static",
            //             icon: "fa fa-fw fa-bars",
            //             command: (event) => this.app.changeMenuMode("static"),
            //         },
            //         {
            //             label: "Overlay",
            //             icon: "fa fa-fw fa-bars",
            //             command: (event) => this.app.changeMenuMode("overlay"),
            //         },
            //         {
            //             label: "Slim",
            //             icon: "fa fa-fw fa-bars",
            //             command: (event) => this.app.changeMenuMode("slim"),
            //         },
            //         {
            //             label: "Horizontal",
            //             icon: "fa fa-fw fa-bars",
            //             command: (event) =>
            //                 this.app.changeMenuMode("horizontal"),
            //         },
            //     ],
            // },
            // {
            //     label: "THEMES",
            //     icon: "fa fa-fw fa-paint-brush",
            //     badge: 10,
            //     items: [
            //         {
            //             label: "Blue-Grey Teal",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("bluegrey-teal"),
            //         },
            //         {
            //             label: "Green Yellow",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("green-yellow"),
            //         },
            //         {
            //             label: "Purple Blue",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("purple-blue"),
            //         },
            //         {
            //             label: "Blue Orange",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("blue-orange"),
            //         },
            //         {
            //             label: "Indigo Yellow",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("indigo-yellow"),
            //         },
            //         {
            //             label: "Amber Teal",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("amber-teal"),
            //         },
            //         {
            //             label: "Cyan Amber",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("cyan-amber"),
            //         },
            //         {
            //             label: "Brown Cyan",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("brown-cyan"),
            //         },
            //         {
            //             label: "Lime Purple",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("lime-purple"),
            //         },
            //         {
            //             label: "Deep-Orange Blue",
            //             icon: "fa fa-fw fa-paint-brush",
            //             command: (event) => this.changeTheme("deeporange-blue"),
            //         },
            //     ],
            // },
            // {
            //     label: "COMPONENTS",
            //     icon: "fa fa-fw fa-bars",
            //     routerLink: ["/components"],
            //     items: [
            //         {
            //             label: "Sample Page",
            //             icon: "fa fa-fw fa-columns",
            //             routerLink: ["sample"],
            //         },
            //         {
            //             label: "Forms",
            //             icon: "fa fa-fw fa-code",
            //             routerLink: ["forms"],
            //         },
            //         {
            //             label: "Data",
            //             icon: "fa fa-fw fa-table",
            //             routerLink: ["data"],
            //         },
            //         {
            //             label: "Panels",
            //             icon: "fa fa-fw fa-list-alt",
            //             routerLink: ["panels"],
            //         },
            //         {
            //             label: "Overlays",
            //             icon: "fa fa-fw fa-square",
            //             routerLink: ["overlays"],
            //         },
            //         {
            //             label: "Menus",
            //             icon: "fa fa-fw fa-minus-square-o",
            //             routerLink: ["menus"],
            //         },
            //         {
            //             label: "Messages",
            //             icon: "fa fa-fw fa-circle-o-notch",
            //             routerLink: ["messages"],
            //         },
            //         {
            //             label: "Charts",
            //             icon: "fa fa-fw fa-area-chart",
            //             routerLink: ["charts"],
            //         },
            //         {
            //             label: "File",
            //             icon: "fa fa-fw fa-arrow-circle-o-up",
            //             routerLink: ["file"],
            //         },
            //         {
            //             label: "Misc",
            //             icon: "fa fa-fw fa-user-secret",
            //             routerLink: ["misc"],
            //         },
            //     ],
            // },
            // {
            //     label: "PAGES",
            //     icon: "fa fa-fw fa-cube",
            //     routerLink: ["/pages"],
            //     items: [
            //         {
            //             label: "Empty",
            //             icon: "fa fa-fw fa-square-o",
            //             routerLink: ["/pages/empty"],
            //         },
            //         {
            //             label: "Login",
            //             icon: "fa fa-fw fa-sign-in",
            //             url: "assets/pages/login.html",
            //             target: "_blank",
            //         },
            //         {
            //             label: "Landing",
            //             icon: "fa fa-fw fa-certificate",
            //             url: "assets/pages/landing.html",
            //             target: "_blank",
            //         },
            //         {
            //             label: "Error",
            //             icon: "fa fa-fw fa-exclamation-circle",
            //             url: "assets/pages/error.html",
            //             target: "_blank",
            //         },
            //         {
            //             label: "404",
            //             icon: "fa fa-fw fa-times",
            //             url: "assets/pages/404.html",
            //             target: "_blank",
            //         },
            //         {
            //             label: "Access Denied",
            //             icon: "fa fa-fw fa-exclamation-triangle",
            //             url: "assets/pages/access.html",
            //             target: "_blank",
            //         },
            //     ],
            // },
            // {
            //     label: "HIERARCHY",
            //     icon: "fa fa-fw fa-sitemap",
            //     items: [
            //         {
            //             label: "Submenu 1",
            //             icon: "fa fa-fw fa-sign-in",
            //             items: [
            //                 {
            //                     label: "Submenu 1.1",
            //                     icon: "fa fa-fw fa-sign-in",
            //                     items: [
            //                         {
            //                             label: "Submenu 1.1.1",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                         {
            //                             label: "Submenu 1.1.2",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                         {
            //                             label: "Submenu 1.1.3",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                     ],
            //                 },
            //                 {
            //                     label: "Submenu 1.2",
            //                     icon: "fa fa-fw fa-sign-in",
            //                     items: [
            //                         {
            //                             label: "Submenu 1.2.1",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                     ],
            //                 },
            //             ],
            //         },
            //         {
            //             label: "Submenu 2",
            //             icon: "fa fa-fw fa-sign-in",
            //             items: [
            //                 {
            //                     label: "Submenu 2.1",
            //                     icon: "fa fa-fw fa-sign-in",
            //                     items: [
            //                         {
            //                             label: "Submenu 2.1.1",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                         {
            //                             label: "Submenu 2.1.2",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                     ],
            //                 },
            //                 {
            //                     label: "Submenu 2.2",
            //                     icon: "fa fa-fw fa-sign-in",
            //                     items: [
            //                         {
            //                             label: "Submenu 2.2.1",
            //                             icon: "fa fa-fw fa-sign-in",
            //                         },
            //                     ],
            //                 },
            //             ],
            //         },
            //     ],
            // },
            // {
            //     label: "DOCS",
            //     icon: "fa fa-fw fa-file-code-o",
            //     routerLink: ["/documentation"],
            // },
            // {
            //     label: "BUY NOW",
            //     icon: "fa fa-fw fa-credit-card-alt",
            //     url: ["https://www.primefaces.org/store"],
            // },
        ];
        this.patientMenu = [
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
                icon: "fa fa-fw fa-user-md",
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
        this.setMenuData();
    }
    setMenuData() {
        for (const patient of this.patientArray) {
            if (this.router.url === `/dashboard/${patient}`) {
                this.showMainMenu = false;
                this.showPatientMenu = true;
                break;
            } else {
                this.showMainMenu = true;
                this.showPatientMenu = false;
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
