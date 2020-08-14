import { ParameterValueService } from "./../../services/parameter-value.service";
import { PathologyService } from "./../services/pathology.service";
import { MenuItem } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
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
    home: MenuItem;
    displayTest: boolean;
    selectedTest;
    filteredTests: any[];
    allTests = [];
    showTests = true;
    selected;
    selectedTestData = [];
    uploadedFiles: any[] = [];
    uploadedImages: any[] = [];
    selectedSession;
    dialogHeader;
    showSaveButton = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private pathologyService: PathologyService,
        private parameterValueService: ParameterValueService,
        private cdref: ChangeDetectorRef,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        let selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.dialogHeader = "Add New Pathology";
        this.pathology.patientSessionId = this.selectedSession.id;
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
            { label: this.selectedSession.displayName },
        ];
        this.cols = [
            { field: "id", header: "ID", width: "20%" },
            { field: "name", header: "Name", width: "80%" },
        ];
        this.home = { icon: "fa fa-stethoscope" };

        this.getAllTests();
        this.getAllPathologies();
    }
    save() {
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.deseaseId;
            element.sessionPathologyId = this.selectedSession.id;
        });
        this.pathology.deseaseId = this.selected.deseaseId;
        this.pathology.deseaseName = this.selected.deseaseName;
        this.pathology.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .createParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                this.pathology = new Pathology();
                this.selectedTest = "";
                this.filteredTests = [];
                this.selected = "";
                this.displayTest = false;
                this.dialogHeader = "Add New Recommendation";
                this.getAllPathologies();
                this.showMessage("success", "Saved", "Data saved successfully");
                this.spinner.hide();
            });
    }
    update() {
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.deseaseId;
            element.sessionPathologyId = this.selectedSession.id;
        });
        this.pathology.deseaseId = this.selected.deseaseId;
        this.pathology.deseaseName = this.selected.deseaseName;
        this.pathology.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .updateParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                this.pathology = new Pathology();
                this.selectedTest = "";
                this.filteredTests = [];
                this.selected = "";
                this.displayTest = false;
                this.dialogHeader = "Add New Recommendation";
                this.getAllPathologies();
                this.showMessage("success", "Saved", "Data saved successfully");
                this.spinner.hide();
            });
    }
    onHide() {
        this.showTests = true;
        this.filteredTests = [];
        this.selectedTest = "";
        this.showSaveButton = true;
    }
    cancelTest() {
        this.selectedTest = "";
        this.selected = "";
        this.filteredTests = [];
        this.showTests = true;
        this.displayTest = false;
        this.dialogHeader = "Add New Pathology";
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
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
    getAllTests() {
        this.pathologyService.getTest("diagnosisPathology").then((res) => {
            this.allTests = res;
        });
    }
    filterTest(event) {
        const query = event.query;
        this.pathologyService.getTest("diagnosisPathology").then((tests) => {
            this.filteredTests = this.searchTest(query, tests);
        });
    }
    searchTest(query, tests: any[]): any[] {
        const filtered: any[] = [];
        for (const item of tests) {
            const test = item;
            if (
                test.deseaseName.toLowerCase().indexOf(query.toLowerCase()) ===
                0
            ) {
                filtered.push(test);
            }
        }
        return filtered;
    }
    showTestDialog() {
        this.displayTest = true;
    }
    getAllPathologies() {
        this.spinner.show();
        this.pathologyService
            .getAllPathologies(this.selectedSession.id)
            .subscribe((result) => {
                this.pathologies = result;
                this.spinner.hide();
            });
    }
    async openTest(test) {
        this.selected = test;
        this.pathologyService.getTest(test.deseaseId).then(
            (res) => {
                this.selectedTestData = res;
                this.showTests = false;
                this.dialogHeader = res.map((r) => r.name);
            },
            (err) => {
                if (this.showTests) {
                    test.patientSessionId = this.selectedSession.id;
                    this.saveWithoutParams(test);
                } else {
                    this.showTests = true;
                    return false;
                }
            }
        );
    }
    saveWithoutParams(test) {
        this.pathologyService.createPathology(test).subscribe((u: any) => {
            this.selectedTest = "";
            this.filteredTests = [];
            this.selected = "";
            this.displayTest = false;
            this.pathology = new Pathology();
            this.dialogHeader = "Add New Pathology";
            this.getAllPathologies();
            this.showMessage("success", "Saved", "Data saved successfully");
            this.spinner.hide();
        });
    }
    uploadImages(event) {
        for (const file of event.files) {
            this.uploadedImages.push(file);
        }
        this.showMessage("info", "Success", "Upload Completed");
    }
    uploadFiles(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.showMessage("info", "Success", "Upload Completed");
    }
    async retrieveTestData(test) {
        await this.openTest(test);
        this.showTests = false;
        this.spinner.show();
        this.pathologyService
            .getTestParametersValues(test.id)
            .subscribe((result) => {
                if (result && result.length > 0) {
                    this.showSaveButton = false;
                    this.selectedTestData[0].id = test.id;
                    const parameters = this.selectedTestData[0].parameters;
                    if (parameters && parameters.length > 0) {
                        for (const element of parameters) {
                            for (const item of result) {
                                if (
                                    element.name === item.parameterName &&
                                    element.type === "table"
                                ) {
                                    for (const cell of element.cells) {
                                        if (
                                            cell.name ===
                                                item.subParameterName &&
                                            item.ear === "left"
                                        ) {
                                            if (
                                                element.cellType === "boolean"
                                            ) {
                                                cell.left = {
                                                    name: item.value,
                                                };
                                            } else {
                                                cell.left = item.value;
                                            }
                                        }
                                        if (
                                            cell.name ===
                                                item.subParameterName &&
                                            item.ear === "right"
                                        ) {
                                            if (
                                                element.cellType === "boolean"
                                            ) {
                                                cell.right = {
                                                    name: item.value,
                                                };
                                            } else {
                                                cell.right = item.value;
                                            }
                                        }
                                    }
                                }
                                if (
                                    element.name === item.parameterName &&
                                    element.type === "textarea"
                                ) {
                                    element.textareaVal = item.value;
                                }
                                if (
                                    element.name === item.parameterName &&
                                    element.type === "list"
                                ) {
                                    if (item.ear === "left") {
                                        const found = element.values.filter(
                                            (val) => val.name === item.value
                                        );
                                        element.leftVal = found[0];
                                    }
                                    if (item.ear === "right") {
                                        const found = element.values.filter(
                                            (val) => val.name === item.value
                                        );
                                        element.rightVal = found[0];
                                    }
                                }
                                if (
                                    element.type === "text" ||
                                    element.type === "number" ||
                                    element.type === "boolean"
                                ) {
                                    if (
                                        element.name === item.parameterName &&
                                        item.ear === "left"
                                    ) {
                                        element.leftVal = item.value;
                                    }
                                    if (
                                        element.name === item.parameterName &&
                                        item.ear === "right"
                                    ) {
                                        element.rightVal = item.value;
                                    }
                                }
                            }
                        }
                    }
                    this.displayTest = true;
                    this.cdref.detectChanges();
                }
                this.spinner.hide();
            });
    }
}
