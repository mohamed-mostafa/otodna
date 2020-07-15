import { Equipment } from "./equipment";
import { Router } from "@angular/router";
import { Acoustic } from "./acoustic";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Test } from "./test";
import { TestsService } from "../services/tests.service";

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
    equipmentMenu: MenuItem[];
    selectedEvent;
    dialogName = "";
    frequencyTable = [];
    home: MenuItem;
    displayAcoustic: boolean;
    displayTest: boolean;
    rightVal = ["", "", "", ""];
    leftVal = ["", "", "", ""];
    showTableFlag = false;
    showEquipmentTable = false;
    selectedTest;
    filteredTests: any[];
    allTests = [];
    showTests = true;
    selected;
    constructor(
        private messageService: MessageService,
        private testService: TestsService,
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
        this.cols = [
            { field: "id", header: "ID", width: "10%" },
            { field: "name", header: "Name", width: "90%" },
        ];
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
        this.showEquipmentsTable();
        this.getAllTests();
    }
    showTable() {
        if (this.tests.length > 0) {
            this.showTableFlag = true;
        }
    }
    showEquipmentsTable() {
        if (this.equipments.length > 0) {
            this.showEquipmentTable = true;
        }
    }
    saveTest() {
        this.test.id = this.selected.id;
        this.test.name = this.selected.name;
        this.spinner.show();
        setTimeout(() => {
            this.tests.push(this.test);
            this.selectedTest = "";
            this.filteredTests = [];
            this.selected = "";
            this.showTests = true;
            this.displayTest = false;
            this.test = new Test();
            this.showTable();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        }, 2000);
    }
    cancelTest() {
        this.selectedTest = "";
        this.selected = "";
        this.filteredTests = [];
        this.showTests = true;
        this.displayTest = false;
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    openAcoustic(event) {
        this.dialogName = event.item.label;
        this.selectedEvent = event;
        this.displayAcoustic = true;
    }
    showTestDialog() {
        this.displayTest = true;
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
        // this.saveTest(this.selectedEvent);
    }
    saveEquipment(event) {
        this.equipment.equipmentType = event.item.label;
        this.spinner.show();
        setTimeout(() => {
            this.equipments.push(this.equipment);
            this.equipment = new Equipment();
            this.showEquipmentsTable();
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
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
    filterTest(event) {
        const query = event.query;
        this.testService.getTests().then((tests) => {
            this.filteredTests = this.searchTest(query, tests);
        });
    }
    searchTest(query, tests: any[]): any[] {
        // in a real application, make a request to a remote url with the query and return filtered results,
        // for demo we filter at client side
        const filtered: any[] = [];
        for (const item of tests) {
            const test = item;
            if (test.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(test);
            }
        }
        return filtered;
    }
    getAllTests() {
        this.testService.getTests().then((res) => {
            this.allTests = res;
        });
    }
    openTest(test) {
        this.selected = test;
        this.showTests = false;
    }
}
