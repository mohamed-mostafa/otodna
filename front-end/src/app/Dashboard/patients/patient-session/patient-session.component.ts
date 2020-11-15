import { DepartmentsService } from "./../../services/departments.service";
import { DocumentsService } from "./../../services/documents.service";
import { PatientService } from "./../services/patient.service";
import { TreatmentTestsService } from "./../treatments/services/treatment-tests.service";
import { CandidacyService } from "./../diagnosis/services/candidacy.service";
import { PathologyService } from "./../diagnosis/services/pathology.service";
import { TestsService } from "./../diagnosis/services/tests.service";
import { SymptomsService } from "./../diagnosis/services/symptoms.service";
import { PatientSessionService } from "./../services/patient-session.service";
import { Session } from "./session";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-patient-session",
    templateUrl: "./patient-session.component.html",
    styleUrls: ["./patient-session.component.css"],
    providers: [MessageService],
})
export class PatientSessionComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    items: MenuItem[];
    home: MenuItem;
    session: Session = new Session();
    selectedPatient;
    label;
    showButtons = true;
    public href: string = "";
    selectedSession;
    showAllButtons = true;
    showGenerateConclusion = true;
    departments = [];
    selectedDepartment;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private patientSession: PatientSessionService,
        private symptomsService: SymptomsService,
        private testService: TestsService,
        private pathologyService: PathologyService,
        private candidacyService: CandidacyService,
        private treatmentService: TreatmentTestsService,
        private patientService: PatientService,
        private departmentsService: DepartmentsService,
        private documentService: DocumentsService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );

        this.session.sessionTypeId = JSON.parse(
            localStorage.getItem("sessionTypeId")
        );
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        if (LoggedInUser.teams.length > 1) {
            LoggedInUser.teams.forEach((element) => {
                this.departments.push(element.department);
            });
            this.departments = [
                ...new Map(
                    this.departments.map((item) => [item["id"], item])
                ).values(),
            ];
        } else if (LoggedInUser.teams.length === 1) {
            this.departments.push(LoggedInUser.teams[0].department);
            this.selectedDepartment = LoggedInUser.teams[0].department;
        }
        this.href = this.router.url;
        if (this.session.sessionTypeId === 0) {
            this.label = "New Diagnosis";
            this.session.displayName = `Diagnosis - ${String(new Date()).slice(
                4,
                15
            )}`;
        } else if (this.session.sessionTypeId === 1) {
            this.label = "New Treatment";
            this.session.displayName = `Treatment - ${String(new Date()).slice(
                4,
                15
            )}`;
        } else {
            this.session.displayName = `Followup - ${String(new Date()).slice(
                4,
                15
            )}`;
            this.label = "New Followup";
        }
        this.session.patientId = this.selectedPatient.id;
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
            {
                label: this.selectedSession
                    ? this.selectedSession.displayName
                    : this.label,
            },
            {
                label: this.selectedSession
                    ? this.selectedSession.ended === "false"
                        ? "End Session"
                        : "This Session Is Ended"
                    : "",
                command: () => {
                    this.endSession();
                },
                styleClass: this.selectedSession
                    ? (this.selectedSession.ended === "false" &&
                          this.showAllButtons) ||
                      !this.showButtons
                        ? "endSession"
                        : "displayNone"
                    : "",
            },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.loadData();
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
    }
    getDepartmentById(id) {
        return new Promise((resolve) => {
            this.departmentsService
                .getDepartmentById(id)
                .subscribe((result) => {
                    resolve(result[0]);
                });
        });
    }
    async loadData() {
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        if (this.selectedSession) {
            this.session = this.selectedSession;
            this.session.date = new Date(this.selectedSession.date);
            this.session.createdAt = new Date(this.selectedSession.createdAt);
            this.selectedDepartment = await this.getDepartmentById(
                this.selectedSession.departmentId
            );
            this.showButtons = false;
        } else {
            this.session.date = new Date();
            this.session.createdAt = new Date();
            this.session.createdBy =
                this.selectedPatient.firstName +
                " " +
                this.selectedPatient.lastName;
            this.session.performer =
                this.selectedPatient.firstName +
                " " +
                this.selectedPatient.lastName;
            this.showButtons = true;
        }
    }
    reset() {
        this.session = new Session();
        this.selectedDepartment = "";
        this.goToPatientPage("a");
    }
    save() {
        this.validateSession((callback) => {
            if (callback === "valid") {
                this.session.departmentId = this.selectedDepartment.id;
                this.spinner.show();
                this.patientSession
                    .createSession(this.session)
                    .subscribe((u: any) => {
                        u.ended = "false";
                        this.spinner.hide();
                        localStorage.setItem(
                            "sessionBasicInfo",
                            JSON.stringify(u)
                        );
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Session Started"
                        );
                        setTimeout(() => {
                            this.router
                                .navigateByUrl("/RefreshComponent", {
                                    skipLocationChange: true,
                                })
                                .then(() => {
                                    this.router.navigate([this.href]);
                                });
                        }, 1000);
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    update() {
        this.validateSession((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                if (this.session.notes === null) {
                    delete this.session.notes;
                }
                this.session.departmentId = this.selectedDepartment.id;
                this.patientSession
                    .updateSession(this.session)
                    .subscribe((u: any) => {
                        this.spinner.hide();
                        localStorage.setItem(
                            "sessionBasicInfo",
                            JSON.stringify(this.session)
                        );
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Data updated successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    validateSession(callback) {
        if (!this.session.displayName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Display Name is required"
            );
            return false;
        }
        if (!this.session.date) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Date is required"
            );
            return false;
        }
        if (!this.session.createdBy) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Created By is required"
            );
            return false;
        }
        if (!this.session.createdAt) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Created At is required"
            );
            return false;
        }
        if (!this.session.performer) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Performer is required"
            );
            return false;
        }
        if (!this.selectedDepartment) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Department is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    goToPatientPage(event) {
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    endSession() {
        if (this.selectedSession.ended === "false") {
            if (!this.session.notes) {
                this.showMessageComponent.showMessage(
                    "error",
                    "Validation Error",
                    "Conclusion is required"
                );
                return false;
            }
            this.session.ended = "true";
            this.patientSession
                .updateSession(this.session)
                .subscribe((u: any) => {
                    this.session = new Session();
                    this.goToPatientPage("a");
                });
        }
    }
    generateConclusion() {
        this.showGenerateConclusion = false;
        this.session.notes = "";
        if (this.router.url === "/dashboard/addTreatment") {
            this.spinner.show();
            this.treatmentService
                .getSessionTreatments(this.selectedSession.id)
                .subscribe((result) => {
                    if (result && result.length > 0) {
                        if (this.session.notes !== null) {
                            this.session.notes += "Performed Treatments:";
                        } else {
                            this.session.notes = "Performed Treatments:";
                        }
                        for (const r of result) {
                            this.session.notes += ` ${r.treatmentName}, `;
                        }
                        this.session.notes += `\n\r`;
                    }
                    this.spinner.hide();
                });
        } else {
            this.spinner.show();
            this.symptomsService
                .getPatientSessionSymptoms(this.selectedSession.id)
                .subscribe(async (result) => {
                    if (result && result.length > 0) {
                        if (this.session.notes !== null) {
                            this.session.notes += "Patient suffers:";
                        } else {
                            this.session.notes = "Patient suffers:";
                        }
                        for (const r of result) {
                            this.session.notes += ` ${r.summaryName}, `;
                        }
                        this.session.notes += `\n\r`;
                    }
                    this.spinner.hide();
                });
            this.testService
                .getSessionTests(this.selectedSession.id)
                .subscribe((result) => {
                    if (result && result.length > 0) {
                        if (this.session.notes !== null) {
                            this.session.notes += "Performed Tests:";
                        } else {
                            this.session.notes = "Performed Tests:";
                        }
                        for (const r of result) {
                            this.session.notes += ` ${r.testName}, `;
                        }
                        this.session.notes += `\n\r`;
                    }
                    this.spinner.hide();
                });
            this.pathologyService
                .getAllPathologies(this.selectedSession.id)
                .subscribe((result) => {
                    if (result && result.length > 0) {
                        if (this.session.notes !== null) {
                            this.session.notes += "Pathology:";
                        } else {
                            this.session.notes = "Pathology:";
                        }
                        for (const r of result) {
                            this.session.notes += ` ${r.diseaseName}, `;
                        }
                        this.session.notes += `\n\r`;
                    }
                    this.spinner.hide();
                });
            this.candidacyService
                .getAllCandidacies(this.selectedSession.id)
                .subscribe((result) => {
                    if (result && result.length > 0) {
                        if (this.session.notes !== null) {
                            this.session.notes += "Recommendations:";
                        } else {
                            this.session.notes = "Recommendations:";
                        }
                        for (const r of result) {
                            this.session.notes += ` ${r.treatmentName}, `;
                        }
                        this.session.notes += `\n\r`;
                    }
                    this.spinner.hide();
                });
        }
    }
}
