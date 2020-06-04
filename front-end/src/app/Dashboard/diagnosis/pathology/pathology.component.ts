import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Pathology } from "./pathology";

@Component({
    selector: "app-pathology",
    templateUrl: "./pathology.component.html",
    styleUrls: ["./pathology.component.css"],
    providers: [MessageService],
})
export class PathologyComponent implements OnInit {
    cols: any[];
    pathologies: any[] = [];
    pathology: Pathology = new Pathology();
    items: MenuItem[];
    pathologyMenu: MenuItem[];
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
        this.cols = [{ field: "testType", header: "Pathology Type" }];
        this.home = { icon: "fa fa-stethoscope" };

        this.pathologyMenu = [
            {
                label: "Otorhinolaryngologic Diseases [C09]",
                icon: "fa fa-stethoscope",
                items: [
                    {
                        label: "Ear Diseases [C09.218]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label:
                                    "Cholesteatoma, Middle Ear [C09.218.200]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Congenital Microtia [C09.218.235]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label:
                                    "Ear Deformities, Acquired [C09.218.271]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Ear Neoplasms [C09.218.334]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Earache [C09.218.350]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Hearing Disorders [C09.218.458]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label: "Hearing Loss [C09.218.458.341]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Deafness [C09.218.458.341.186]",
                                                icon: "fa fa-stethoscope",
                                                items: [
                                                    {
                                                        label:
                                                            "Deaf-Blind Disorders [C09.218.458.341.186.500]",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        items: [
                                                            {
                                                                label:
                                                                    "Usher Syndromes [C09.218.458.341.186.500.500]",
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
                                                            {
                                                                label:
                                                                    "Wolfram Syndrome [C09.218.458.341.186.500.750]",
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
                                                    "Hearing Loss, Bilateral [C09.218.458.341.374]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Conductive [C09.218.458.341.562]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Functional [C09.218.458.341.750]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, High-Frequency [C09.218.458.341.812]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Mixed Conductive-Sensorineural [C09.218.458.341.849]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Sensorineural [C09.218.458.341.887] ",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Sudden [C09.218.458.341.900]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Unilateral [C09.218.458.341.950]",
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
                                label: "Herpes Zoster Oticus [C09.218.513]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label: "Hyperacusis [C09.218.458.505]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label: "Tinnitus [C09.218.458.670]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label: "Labyrinth Diseases [C09.218.568]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Cochlear Diseases [C09.218.568.120]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                ],
                            },
                            {
                                label: "Myringosclerosis [C09.218.636]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Endolymphatic Hydrops [C09.218.568.217]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Meniere Disease [C09.218.568.217.500]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        label:
                                            "Labyrinthitis [C09.218.568.558]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Vestibular Diseases [C09.218.568.900]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Bilateral Vestibulopathy [C09.218.568.900.442]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Vertigo [C09.218.568.900.883]",
                                                icon: "fa fa-stethoscope",
                                                items: [
                                                    {
                                                        label:
                                                            "Benign Paroxysmal Positional Vertigo [C09.218.568.900.883.500]",
                                                        icon:
                                                            "fa fa-stethoscope",
                                                        command: (event) => {
                                                            this.save(event);
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Otitis [C09.218.705]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Labyrinthitis [C09.218.705.371]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label:
                                            "Otitis Externa [C09.218.705.496]",
                                        icon: "fa fa-stethoscope",
                                        command: (event) => {
                                            this.save(event);
                                        },
                                    },
                                    {
                                        label: "Otitis Media [C09.218.705.663]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Mastoiditis [C09.218.705.663.652]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Otitis Media with Effusion [C09.218.705.663.670]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Otitis Media, Suppurative [C09.218.705.663.680]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Petrositis [C09.218.705.663.841]",
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
                                label: "Otomycosis [C09.218.736]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Otosclerosis [C09.218.768]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Ototoxicity [C09.218.788]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Retrocochlear Diseases [C09.218.807]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Auditory Diseases, Central [C09.218.807.186]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Auditory Perceptual Disorders [C09.218.807.186.094]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Hearing Loss, Central [C09.218.807.186.432]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        label:
                                            "Vestibulocochlear Nerve Diseases [C09.218.807.800]",
                                        icon: "fa fa-stethoscope",
                                        items: [
                                            {
                                                label:
                                                    "Neuroma, Acoustic [C09.218.807.800.675]",
                                                icon: "fa fa-stethoscope",
                                                items: [
                                                    {
                                                        label:
                                                            "Neurofibromatosis 2 [C09.218.807.800.675.500]",
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
                                                    "Vestibular Neuronitis [C09.218.807.800.837]",
                                                icon: "fa fa-stethoscope",
                                                command: (event) => {
                                                    this.save(event);
                                                },
                                            },
                                            {
                                                label:
                                                    "Vestibulocochlear Nerve Injuries [C09.218.807.800.918]",
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
                                label: "Susac Syndrome [C09.218.855]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label:
                                    "Tympanic Membrane Perforation [C09.218.903]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                        ],
                    },
                    {
                        label: "Otorhinolaryngologic Neoplasms [C09.647]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label: "Ear Neoplasms [C09.647.312]",
                                icon: "fa fa-stethoscope",
                                command: (event) => {
                                    this.save(event);
                                },
                            },
                            {
                                label: "Neuroma, Acoustic [C09.647.675]",
                                icon: "fa fa-stethoscope",
                                items: [
                                    {
                                        label:
                                            "Neurofibromatosis 2 [C09.647.675.500]",
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
                    },
                ],
            },
            {
                label:
                    "Congenital, Hereditary, and Neonatal Diseases and Abnormalities [C16] ",
                icon: "fa fa-stethoscope",
                items: [
                    {
                        label: "Congenital Abnormalities [C16.131]",
                        icon: "fa fa-stethoscope",
                        items: [
                            {
                                label: "Congenital Microtia [C16.131.287]",
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
        ];
        this.showTable();
    }
    showTable() {
        if (this.pathologies.length > 0) {
            this.showTableFlag = true;
        }
    }
    save(event) {
        this.pathology.pathologyType = event.item.label;
        this.spinner.show();
        setTimeout(() => {
            this.pathologies.push(this.pathology);
            this.pathology = new Pathology();
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
}
