import { TeamsService } from "./../../../services/teams.service";
import { ParameterValueService } from "./../../services/parameter-value.service";
import { CandidacyService } from "./../services/candidacy.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Candidacy } from "./candidacy";

@Component({
    selector: "app-candidacy",
    templateUrl: "./candidacy.component.html",
    styleUrls: ["./candidacy.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class CandidacyComponent implements OnInit {
    selectedPatient;
    cols: any[];
    candidacies: any[] = [];
    candidacy: Candidacy = new Candidacy();
    items: MenuItem[];
    home: MenuItem;
    displayTest: boolean;
    selectedTest;
    filteredTests: any[];
    allTests = [];
    allEquipments = [];
    showTests = true;
    selected;
    selectedTestData = [];
    uploadedFiles: any[] = [];
    uploadedImages: any[] = [];
    selectedSession;
    dialogHeader;
    showSaveButton = true;
    showAllButtons = true;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private candidacyService: CandidacyService,
        private parameterValueService: ParameterValueService,
        private cdref: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private teamsService: TeamsService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.dialogHeader = "Add New Recommendation";
        this.candidacy.patientSessionId = this.selectedSession.id;
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label:
                    this.selectedPatient.firstName +
                    " " +
                    this.selectedPatient.lastName,
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
        this.getAllCandidacies();
        this.checkLoggedInUserTeamWithPatient();
    }
    checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        if (LoggedInUser.teams.length > 0) {
            const found = LoggedInUser.teams.some(
                (team) => team.id === this.selectedPatient.teamId
            );
            if (found) {
                this.showAllButtons = true;
            } else {
                this.showAllButtons = false;
            }
        }
    }
    save() {
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.treatmentId;
            element.sessionTreatmentId = this.selectedSession.id;
        });
        this.candidacy.treatmentId = this.selected.treatmentId;
        this.candidacy.treatmentName = this.selected.treatmentName;
        this.candidacy.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .createParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                this.selectedTest = "";
                this.filteredTests = [];
                this.selected = "";
                this.displayTest = false;
                this.candidacy = new Candidacy();
                this.dialogHeader = "Add New Recommendation";
                this.getAllCandidacies();
                this.showMessage("success", "Saved", "Data saved successfully");
                this.spinner.hide();
            });
    }
    updateTest() {
        this.selectedTestData.forEach((element) => {
            element.testId = this.selected.treatmentId;
            element.sessionTreatmentId = this.selectedSession.id;
        });
        this.candidacy.treatmentId = this.selected.treatmentId;
        this.candidacy.treatmentName = this.selected.treatmentName;
        this.candidacy.patientSessionId = this.selectedSession.id;
        this.spinner.show();
        this.parameterValueService
            .updateParametersValues(this.selectedTestData)
            .subscribe((u: any) => {
                this.selectedTest = "";
                this.filteredTests = [];
                this.selected = "";
                this.displayTest = false;
                this.candidacy = new Candidacy();
                this.dialogHeader = "Add New Recommendation";
                this.getAllCandidacies();
                this.showMessage(
                    "success",
                    "Saved",
                    "Data updated successfully"
                );
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
        this.dialogHeader = "Add New Recommendation";
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
        if (this.selectedPatient.teamId === 0) {
            this.candidacyService.getTest("diagnosisCandidacy").then((res) => {
                this.allTests = res;
            });
        } else {
            const promise = new Promise((resolve) => {
                this.teamsService
                    .getTeamById(this.selectedPatient.teamId)
                    .subscribe((result) => {
                        resolve(result);
                    });
            });
            promise.then((data: any) => {
                const id = data.departmentId;
                this.candidacyService
                    .getTest("diagnosisCandidacy")
                    .then((res) => {
                        for (const r of res) {
                            for (const dep of r.departments) {
                                if (dep.id === id) {
                                    this.allTests.push(r);
                                }
                            }
                        }
                    });
            });
        }
    }
    filterTest(event) {
        const query = event.query;
        this.candidacyService.getTest("diagnosisCandidacy").then((tests) => {
            this.filteredTests = this.searchTest(query, tests);
        });
    }
    searchTest(query, tests: any[]): any[] {
        const filtered: any[] = [];
        for (const item of tests) {
            const test = item;
            if (test.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(test);
            }
        }
        return filtered;
    }
    showTestDialog() {
        this.displayTest = true;
    }
    getAllCandidacies() {
        this.spinner.show();
        this.candidacyService
            .getAllCandidacies(this.selectedSession.id)
            .subscribe((result) => {
                this.candidacies = result;
                this.spinner.hide();
            });
    }
    async openTest(test) {
        this.selected = test;
        this.candidacyService.getTest(test.treatmentId).then(
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
        this.candidacyService.createCandidacy(test).subscribe((u: any) => {
            this.selectedTest = "";
            this.filteredTests = [];
            this.selected = "";
            this.displayTest = false;
            this.candidacy = new Candidacy();
            this.dialogHeader = "Add New Recommendation";
            this.getAllCandidacies();
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
        this.candidacyService
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
    endSession() {
        if (this.router.url === "/dashboard/diagnosisCandidacy") {
            this.router
                .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true,
                })
                .then(() => {
                    this.router.navigate(["/dashboard/addDiagnosis"]);
                });
        } else {
            this.router
                .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true,
                })
                .then(() => {
                    this.router.navigate(["/dashboard/addFollowup"]);
                });
        }
    }
    deleteCandidacy(data) {
        this.confirmationService.confirm({
            message: "Do you want to delete this candidacy?",
            header: "Delete Candidacy Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.candidacyService
                    .deleteCandidacy(data.id)
                    .subscribe((u: any) => {
                        this.getAllCandidacies();
                        this.spinner.hide();
                    });
                this.showMessage(
                    "success",
                    "Confirmed",
                    "Candidacy has been deleted"
                );
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
}
