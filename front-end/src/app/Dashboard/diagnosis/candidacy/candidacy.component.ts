import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { Candidacy } from "./candidacy";

@Component({
    selector: "app-candidacy",
    templateUrl: "./candidacy.component.html",
    styleUrls: ["./candidacy.component.css"],
    providers: [MessageService],
})
export class CandidacyComponent implements OnInit {
    cols: any[];
    candidacies: any[] = [];
    candidacy: Candidacy = new Candidacy();
    items: MenuItem[];
    candidacyMenu: MenuItem[];
    home: MenuItem;
    showTableFlag = false;

    constructor(
        private messageService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label:
                    selectedPatient.firstName + " " + selectedPatient.lastName,
                command: (event) => {
                    this.goToPatientPage(event);
                },
            },
            { label: "Diagnosis" },
        ];
        this.cols = [{ field: "testType", header: "Candidacy Type" }];
        this.home = { icon: "fa fa-stethoscope" };

        this.candidacyMenu = [
            {
                label: "Therapeutics [E02]",
                icon: "fa fa-stethoscope",
                items: [
                    {
                        label: "Acoustic Stimulation [E02.037]",
                        icon: "fa fa-stethoscope",
                        command: (event) => {
                            this.save(event);
                        },
                    },
                    {
                        label: "Drug Therapy [E02.319]",
                        icon: "fa fa-stethoscope",
                        command: (event) => {
                            this.save(event);
                        },
                    },
                    {
                        label: "Rehabilitation [E02.831]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label:
                                    "Correction of Hearing Impairment [E02.831.200]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Communication Methods, Total [E02.831.200.221]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label: "Lipreading [E02.831.200.432]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Manual Communication [E02.831.200.609]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Sign Language [E02.831.200.609.668]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label:
                                    "Rehabilitation of Speech and Language Disorders [E02.831.727]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Language Therapy [E02.831.727.344]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Myofunctional Therapy [E02.831.727.442]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Speech, Alaryngeal [E02.831.727.541]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Speech, Esophageal [E02.831.727.541.677]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        label:
                                            "Speech Therapy [E02.831.727.552]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Voice Training [E02.831.727.862]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    { separator: true },
                    {
                        label: "Quit",
                        icon: "pi pi-fw pi-times",
                    },
                ],
            },
            { separator: true },
            {
                label: "Quit",
                icon: "pi pi-fw pi-times",
            },
        ];
        this.showTable();
    }
    showTable() {
        if (this.candidacies.length > 0) {
            this.showTableFlag = true;
        }
    }
    save(event) {
        this.candidacy.candidacyType = event.item.label;
        this.spinner.show();
        setTimeout(() => {
            this.candidacies.push(this.candidacy);
            this.candidacy = new Candidacy();
            this.showTable();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    customTrackBy(index: number, obj: any): any {
        return index;
    }
    goToPatientPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
    }
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
}
