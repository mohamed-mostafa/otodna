import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Test } from "./test";

@Component({
    selector: "app-tests",
    templateUrl: "./tests.component.html",
    styleUrls: ["./tests.component.css"],
    providers: [MessageService],
})
export class TestsComponent implements OnInit {
    cols: any[];
    tests: any[] = [];
    test: Test = new Test();
    items: MenuItem[];
    testMenu: MenuItem[];
    home: MenuItem;
    displayBasic: boolean;
    showPagination = false;
    constructor(
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            { label: "Patients" },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
            },
            { label: "Diagnosis" },
        ];
        this.cols = [{ field: "testType", header: "Test Type" }];
        this.home = { icon: "fa fa-stethoscope" };
        this.testMenu = [
            {
                label: "Diagnosis [E01]",
                icon: "fa fa-stethoscope",
                items: [
                    {
                        label: "Diagnostic Techniques and Procedures [E01.370]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label: "Diagnostic Imaging [E01.370.350]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Imaging, Three-Dimensional [E01.370.350.400]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label:
                                    "Clinical Laboratory Techniques [E01.370.225]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label:
                                    "Diagnostic Techniques, Otological [E01.370.382] ",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Hearing Tests [E01.370.382.375] ",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Acoustic Impedance Tests [E01.370.382.375.050]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Audiometry [E01.370.382.375.060] ",
                                                icon: "fa fa-stethoscope",
                                                items: [
                                                    {
                                                        label:
                                                            "Audiometry, Evoked Response [E01.370.382.375.060.050]",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        items: [
                                                            {
                                                                label:
                                                                    "Auditory Brainstem Response (ABR) test",
                                                                icon:
                                                                    "fa fa-stethoscope",
                                                                items: [
                                                                    {
                                                                        label:
                                                                            "Electrocochleography",
                                                                        icon:
                                                                            "fa fa-stethoscope",
                                                                        command: (
                                                                            event
                                                                        ) => {
                                                                            this.save(
                                                                                event
                                                                            );
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        label:
                                                            "Audiometry, Pure-Tone [E01.370.382.375.060.055]",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        items: [
                                                            {
                                                                label:
                                                                    " vcc vcccccccccccfcv",
                                                                icon:
                                                                    "fa fa-stethoscope",
                                                                command: (
                                                                    event
                                                                ) => {
                                                                    this.save(
                                                                        event
                                                                    );
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        label:
                                                            "Audiometry, Speech [E01.370.382.375.060.060] ",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        command: (event) => {
                                                            this.save(event);
                                                        },
                                                    },
                                                    {
                                                        label:
                                                            "Psychoacoustics [E01.370.382.375.060.530]",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        command: (event) => {
                                                            this.save(event);
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                label:
                                                    "Dichotic Listening Tests [E01.370.382.375.200]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Recruitment Detection, Audiologic [E01.370.382.375.650]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        label:
                                            "Vestibular Function Tests [E01.370.382.900] ",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Caloric Tests [E01.370.382.900.150]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Electronystagmography [E01.370.382.900.280]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Head Impulse Test [E01.370.382.900.640]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        label: "Otoscopy [E01.370.382.637]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label: "Medical History Taking [E01.370.510]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Cornell Medical Index [E01.370.510.150]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Reproductive History [E01.370.510.700]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label: "Physical Examination [E01.370.600] ",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label: "Vital Signs [E01.370.600.875] ",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label:
                                    "Speech Production Measurement [E01.370.760]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Speech Articulation Tests [E01.370.760.760]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label: "Symptom Assessment [E01.370.872]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            { separator: true },
                            {
                                label: "Quit",
                            },
                        ],
                    },
                    {
                        label: "Prognosis [E01.789]",
                        icon: "fa fa-stethoscope",
                        command: (event) => {
                            this.save(event);
                        },
                    },
                    { separator: true },
                    {
                        label: "Quit",
                    },
                ],
            },
            { separator: true },
            {
                label: "Quit",
                icon: "pi pi-fw pi-times",
            },
        ];
    }
    showDialog() {
        this.displayBasic = true;
    }
    save(event) {
        this.test.testType = event.item.label;
        this.spinner.show();
        setTimeout(() => {
            this.tests.push(this.test);
            this.showPagination = true;
            this.displayBasic = false;
            this.test = new Test();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
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
