import { Equipment } from "./equipment";
import { Router } from "@angular/router";
import { Acoustic } from "./acoustic";
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
    equipmentsCols: any[];
    equipments: any[] = [];
    equipment: Equipment = new Equipment();
    acoustic: Acoustic = new Acoustic();
    acousticTympanogram = [];
    acousticFrequency = [];
    acousticReflex = [];
    items: MenuItem[];
    testMenu: MenuItem[];
    equipmentMenu: MenuItem[];
    selectedEvent;
    dialogName = "";
    frequencyTable = [];
    home: MenuItem;
    displayAcoustic: boolean;
    rightVal = ["", "", "", ""];
    leftVal = ["", "", "", ""];
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
            { label: "Patients" },
            {
                label: selectedPatient.username
                    ? selectedPatient.username
                    : selectedPatient.firstName +
                      " " +
                      selectedPatient.lastName,
                command: (event) => {
                    this.goToPatientPage(event);
                },
            },
            { label: "Diagnosis" },
        ];
        this.cols = [{ field: "testType", header: "Test Type" }];
        this.home = { icon: "fa fa-stethoscope" };
        this.acousticTympanogram = [
            {
                name: "Type A",
            },
            {
                name: "Type B",
            },
            {
                name: "Type C",
            },
            {
                name: "Type AS",
            },
            {
                name: "Type AD",
            },
        ];
        this.acousticFrequency = [
            {
                name: "500",
            },
            {
                name: "1000",
            },
            {
                name: "2000",
            },
            {
                name: "4000",
            },
        ];
        this.acousticReflex = [
            {
                name: "Yes",
            },
            {
                name: "NR",
            },
        ];
        this.frequencyTable = ["500", "1000", "2000", "4000"];

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
                                                    this.openAcoustic(event);
                                                },
                                                styleClass: "menuCss",
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
                                                        // styleClass: "menuCss",

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
                                                            "Audiometry, Speech [E01.370.382.375.060.060]",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        command: (event) => {
                                                            this.save(event);
                                                        },
                                                        // styleClass: "menuCss",
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
        this.equipmentsCols = [
            { field: "equipmentType", header: "Equipment Type" },
        ];
        this.equipmentMenu = [
            {
                label: "Equipment and Supplies [E07]",
                icon: "fa fa-stethoscope",
                items: [
                    {
                        label: "Diagnostic Equipment [E07.230]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label: "Otoscopes [E07.230.550]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.saveEquipment(event);
                                },
                            },
                        ],
                    },
                    {
                        label: "Prostheses and Implants [E07.695]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label:
                                    "Auditory Brain Stem Implants [E07.695.075]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.saveEquipment(event);
                                },
                            },
                            {
                                label: "Cochlear Implants [E07.695.150]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.saveEquipment(event);
                                },
                            },
                            {
                                label: "Ossicular Prosthesis [E07.695.550]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.saveEquipment(event);
                                },
                            },
                            {
                                label: "Bone conduction implant",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.saveEquipment(event);
                                },
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
        if (this.tests.length > 0) {
            this.showTableFlag = true;
        }
    }
    save(event) {
        this.test.testType = event.item.label;
        this.spinner.show();
        setTimeout(() => {
            this.tests.push(this.test);

            this.test = new Test();
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
            life: 1000,
        });
    }
    openAcoustic(event) {
        this.dialogName = event.item.label;
        this.selectedEvent = event;
        this.displayAcoustic = true;
    }
    customTrackBy(index: number, obj: any): any {
        return index;
    }
    cancelAcousticDialog() {
        this.displayAcoustic = false;
        this.acoustic = new Acoustic();
    }
    saveAcousticDialog() {
        this.spinner.show();
        setTimeout(() => {
            this.acoustic.rightAcousticReflex = this.rightVal;
            this.acoustic.leftAcousticReflex = this.leftVal;
            console.log(this.acoustic);
            this.acoustic = new Acoustic();
            this.displayAcoustic = false;
            this.spinner.hide();
        }, 2000);
        this.save(this.selectedEvent);
    }
    saveEquipment(event) {
        this.equipment.equipmentType = event.item.label;
        this.spinner.show();
        setTimeout(() => {
            this.equipments.push(this.equipment);
            this.equipment = new Equipment();
            this.showTable();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
    }
    goToPatientPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
    }
}
