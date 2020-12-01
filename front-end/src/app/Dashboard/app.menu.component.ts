import { Router } from "@angular/router";
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
    showMainMenu: boolean;
    routesArray;
    disabledMenuItem;
    showOtherMenu: boolean;
    constructor(public app: DashboardComponent, private router: Router) {}

    ngOnInit() {
        let selectedUser = JSON.parse(localStorage.getItem("user"));
        this.setMenuData();
        if (
            selectedUser.type.name === "Super User" &&
            selectedUser.role.name === "Consultant"
        ) {
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
        } else if (selectedUser.type.name === "Super User") {
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
        } else if (selectedUser.role.name === "Consultant") {
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
            ];
        } else {
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
            ];
        }
    }
    setMenuData() {
        let promise = new Promise(async (resolve) => {
            if (this.router.url === "/dashboard/search") {
                localStorage.removeItem("selectedPatient");
                localStorage.removeItem("sessionBasicInfo");
                localStorage.removeItem("patientSessionData");
            }
            if (
                this.router.url === "/dashboard/addDiagnosis" ||
                this.router.url === "/dashboard/symptoms" ||
                this.router.url === "/dashboard/diagnosisTests" ||
                this.router.url === "/dashboard/diagnosisPathology" ||
                this.router.url === "/dashboard/diagnosisCandidacy" ||
                this.router.url === "/dashboard/diagnosisDocuments"
            ) {
                const array = [
                    "addDiagnosis",
                    "symptoms",
                    "diagnosisTests",
                    "diagnosisPathology",
                    "diagnosisCandidacy",
                    "diagnosisDocuments",
                ];
                let selectedSession = JSON.parse(
                    localStorage.getItem("sessionBasicInfo")
                );
                if (selectedSession) {
                    this.otherMenu = [
                        {
                            label: "Basic Info",
                            icon: "fa fa-fw fa-stethoscope",
                            routerLink: ["addDiagnosis"],
                        },
                        {
                            label: "Symptoms",
                            icon: "fa fa-fw fa-medkit",
                            routerLink: ["symptoms"],
                        },
                        {
                            label: "Tests",
                            icon: "fa fa-fw fa-flask",
                            routerLink: ["diagnosisTests"],
                            badge: selectedSession.sessionTests
                                ? selectedSession.sessionTests.length
                                : 0,
                        },
                        {
                            label: "Pathology",
                            icon: "fa fa-fw fa-book",
                            routerLink: ["diagnosisPathology"],
                            badge: selectedSession.patientSessionPathologies
                                ? selectedSession.patientSessionPathologies
                                      .length
                                : 0,
                        },
                        {
                            label: "Recommendation",
                            icon: "fa fa-fw fa-stethoscope",
                            routerLink: ["diagnosisCandidacy"],
                            badge: selectedSession.sessionTreatments
                                ? selectedSession.sessionTreatments.length
                                : 0,
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-file-text",
                            routerLink: ["diagnosisDocuments"],
                        },
                    ];
                } else {
                    this.otherMenu = [
                        {
                            label: "Basic Info",
                            icon: "fa fa-fw fa-stethoscope",
                            routerLink: ["addDiagnosis"],
                        },
                        {
                            label: "Symptoms",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Tests",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Pathology",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Recommendation",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                    ];
                }
                resolve(array);
            } else if (
                this.router.url === "/dashboard/addTreatment" ||
                this.router.url === "/dashboard/treatmentTests" ||
                this.router.url === "/dashboard/treatmentsDocuments"
            ) {
                const array = [
                    "addTreatment",
                    "treatmentTests",
                    "treatmentsDocuments",
                ];
                let selectedSession = JSON.parse(
                    localStorage.getItem("sessionBasicInfo")
                );
                if (selectedSession) {
                    this.otherMenu = [
                        {
                            label: "Basic Info",
                            icon: "fa fa-fw fa-info",
                            routerLink: ["addTreatment"],
                        },
                        {
                            label: "Treatments",
                            icon: "fa fa-fw fa-flask",
                            routerLink: ["treatmentTests"],
                            badge: selectedSession.sessionTreatments
                                ? selectedSession.sessionTreatments.length
                                : 0,
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-file-text",
                            routerLink: ["treatmentsDocuments"],
                        },
                    ];
                } else {
                    this.otherMenu = [
                        {
                            label: "Basic Info",
                            icon: "fa fa-fw fa-info",
                            routerLink: ["addTreatment"],
                        },
                        {
                            label: "Treatments",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                    ];
                }
                resolve(array);
            } else if (
                this.router.url === "/dashboard/addFollowup" ||
                this.router.url === "/dashboard/followupSymptoms" ||
                this.router.url === "/dashboard/followupTests" ||
                this.router.url === "/dashboard/followupPathology" ||
                this.router.url === "/dashboard/followupCandidacy" ||
                this.router.url === "/dashboard/followupDocuments"
            ) {
                const array = [
                    "addFollowup",
                    "followupSymptoms",
                    "followupTests",
                    "followupPathology",
                    "followupCandidacy",
                    "followupDocuments",
                ];
                let selectedSession = JSON.parse(
                    localStorage.getItem("sessionBasicInfo")
                );
                if (selectedSession) {
                    this.otherMenu = [
                        {
                            label: "Basic Info",
                            icon: "fa fa-fw fa-info",
                            routerLink: ["addFollowup"],
                        },
                        {
                            label: "Symptoms",
                            icon: "fa fa-fw fa-medkit",
                            routerLink: ["followupSymptoms"],
                        },
                        {
                            label: "Tests",
                            icon: "fa fa-fw fa-flask",
                            routerLink: ["followupTests"],
                            badge: selectedSession.sessionTests
                                ? selectedSession.sessionTests.length
                                : 0,
                        },
                        {
                            label: "Pathology",
                            icon: "fa fa-fw fa-book",
                            routerLink: ["followupPathology"],
                            badge: selectedSession.patientSessionPathologies
                                ? selectedSession.patientSessionPathologies
                                      .length
                                : 0,
                        },
                        {
                            label: "Recommendation",
                            icon: "fa fa-fw fa-stethoscope",
                            routerLink: ["followupCandidacy"],
                            badge: selectedSession.sessionTreatments
                                ? selectedSession.sessionTreatments.length
                                : 0,
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-file-text",
                            routerLink: ["followupDocuments"],
                        },
                    ];
                } else {
                    this.otherMenu = [
                        {
                            label: "Basic Info",
                            icon: "fa fa-fw fa-info",
                            routerLink: ["addFollowup"],
                        },
                        {
                            label: "Symptoms",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Tests",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Pathology",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Recommendation",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                    ];
                }

                resolve(array);
            } else {
                localStorage.removeItem("sessionBasicInfo");
                const array = [
                    "patientDashboard",
                    "patient",
                    "medical/family",
                    "medical/vital",
                    "medical/allergies",
                    "medical/labResults",
                    "medical/immunizations",
                    "medical/medications",
                    "medical/problems",
                    "patientHistory",
                    "referrals",
                    "medicalHistory",
                    "documents",
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
                            label: "Medical Records",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-lock",
                            styleClass: "menuCss",
                        },
                        {
                            label: "Referrals",
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
                            label: "Dashboard",
                            icon: "fa fa-fw fa-tachometer",
                            routerLink: ["patientDashboard"],
                        },
                        {
                            label: "Basic Information",
                            icon: "fa fa-fw fa-info",
                            routerLink: ["patient"],
                        },
                        {
                            label: "Medical Records",
                            icon: "fa fa-fw fa-heartbeat",
                            routerLink: ["/dashboard/medical"],
                            items: [
                                {
                                    label: "Family",
                                    icon: "fa fa-fw fa-users",
                                    routerLink: ["medical/family"],
                                },
                                {
                                    label: "Vital",
                                    icon: "fa fa-fw fa-star",
                                    routerLink: ["medical/vital"],
                                },
                                {
                                    label: "Allergies",
                                    icon: "fa fa-fw fa-user-md",
                                    routerLink: ["medical/allergies"],
                                },
                                {
                                    label: "Lab Results",
                                    icon: "fa fa-fw fa-flask",
                                    routerLink: ["medical/labResults"],
                                },
                                {
                                    label: "Immunizations",
                                    icon: "fa fa-fw fa-medkit",
                                    routerLink: ["medical/immunizations"],
                                },
                                {
                                    label: "Medications",
                                    icon: "fa fa-fw fa-heartbeat",
                                    routerLink: ["medical/medications"],
                                },
                                {
                                    label: "Problems",
                                    icon: "fa fa-fw fa-exclamation-triangle",
                                    routerLink: ["medical/problems"],
                                },
                            ],
                        },

                        {
                            label: "Referrals",
                            icon: "fa fa-fw fa-user-plus",
                            routerLink: ["referrals"],
                        },
                        // {
                        //     label: "Medical History",
                        //     icon: "fa fa-fw fa-user-md",
                        //     routerLink: ["medicalHistory"],
                        // },
                        {
                            label: "Patient History",
                            icon: "fa fa-fw fa-history",
                            routerLink: ["patientHistory"],
                        },
                        {
                            label: "Documents",
                            icon: "fa fa-fw fa-file-text",
                            routerLink: ["documents"],
                        },
                    ];
                }
                resolve(array);
            }
        });
        promise.then((data: any) => {
            const res = data.some(
                (route) => this.router.url === `/dashboard/${route}`
            );
            if (res) {
                this.showMainMenu = false;
                this.showOtherMenu = true;
            } else {
                this.showMainMenu = true;
                this.showOtherMenu = false;
            }
        });
    }
    onMenuClick(event) {
        if (!this.app.isHorizontal()) {
        } else {
            this.app.onMenuClick(event);
        }
        if (this.router.url === `/dashboard/patient`) {
            let selectedPatient = JSON.parse(
                localStorage.getItem("selectedPatient")
            );
            if (!selectedPatient) {
                this.router
                    .navigateByUrl("/RefreshComponent", {
                        skipLocationChange: true,
                    })
                    .then(() => {
                        this.router.navigate(["/dashboard/patient"]);
                    });
            }
        }
    }
}
