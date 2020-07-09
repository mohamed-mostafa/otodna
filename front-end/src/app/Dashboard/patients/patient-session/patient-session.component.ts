import { PatientSessionService } from "./../services/patient-session.service";
import { Session } from "./session";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
@Component({
    selector: "app-patient-session",
    templateUrl: "./patient-session.component.html",
    styleUrls: ["./patient-session.component.css"],
    providers: [MessageService],
})
export class PatientSessionComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    session: Session = new Session();
    selectedPatient;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private patientSession: PatientSessionService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.session.sessionTypeId = JSON.parse(
            localStorage.getItem("sessionTypeId")
        );

        this.session.patientId = this.selectedPatient.id;
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label: this.selectedPatient.username
                    ? this.selectedPatient.username
                    : this.selectedPatient.firstName +
                      " " +
                      this.selectedPatient.lastName,
                command: (event) => {
                    this.goToPatientPage(event);
                },
            },
            { label: "Basic Info" },
        ];
        this.home = { icon: "fa fa-stethoscope" };
        this.loadData();
    }
    loadData() {
        let selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        if (selectedSession) {
            this.session = selectedSession;
            this.session.date = new Date(selectedSession.date);
            this.session.createdAt = new Date(selectedSession.createdAt);
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
        }
    }
    reset() {
        this.session = new Session();
        this.goToPatientPage("a");
    }
    save() {
        this.validateSession((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.patientSession
                    .createSession(this.session)
                    .subscribe((u: any) => {
                        this.spinner.hide();
                        localStorage.setItem(
                            "sessionBasicInfo",
                            JSON.stringify(u)
                        );
                        this.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                        setTimeout(() => {
                            this.router
                                .navigateByUrl("/RefreshComponent", {
                                    skipLocationChange: true,
                                })
                                .then(() => {
                                    this.router.navigate([
                                        "/dashboard/addDiagnosis",
                                    ]);
                                });
                        }, 1000);
                    });
            } else {
                this.showMessage("warn", "Error", "Please try again");
            }
        });
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    validateSession(callback) {
        if (!this.session.displayName) {
            this.showMessage(
                "error",
                "Validation Error",
                "Display Name is required"
            );
            return false;
        }
        if (!this.session.date) {
            this.showMessage("error", "Validation Error", "Date is required");
            return false;
        }
        if (!this.session.createdBy) {
            this.showMessage(
                "error",
                "Validation Error",
                "Created By is required"
            );
            return false;
        }
        if (!this.session.createdAt) {
            this.showMessage(
                "error",
                "Validation Error",
                "Created At is required"
            );
            return false;
        }
        if (!this.session.performer) {
            this.showMessage(
                "error",
                "Validation Error",
                "Performer is required"
            );
            return false;
        } else {
            callback("valid");
        }
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
