import { DocumentsService } from "./../../services/documents.service";
import { PatientService } from "./../services/patient.service";
import { NgxSpinnerService } from "ngx-spinner";
import { PatientSessionService } from "./../services/patient-session.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../shared/sharedFunctions";
import { MessageService, ConfirmationService } from "primeng/api";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-patient-dashboard",
    templateUrl: "./patient-dashboard.component.html",
    styleUrls: ["./patient-dashboard.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class PatientDashboardComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    selectedPatient;
    patientHistoryData = [];
    showAllButtons = true;
    diagnosisCount;
    treatmentsCount;
    followupCount;
    lastDiagnosis;
    lastTreatment;
    lastFollowup;
    allDocuments = [];
    lastSessionDiseasesAndRecommendations = [];
    lastAudiologyTest;
    lastSpeechTest;
    addNewSessionMenu = [];
    constructor(
        private router: Router,
        private patientSession: PatientSessionService,
        private patientService: PatientService,
        private documentService: DocumentsService,
        private messageService: MessageService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.getPatientHistoryData();
        this.checkLoggedInUserTeamWithPatient();
        this.getDiagnosisCount();
        this.getTreatmentCount();
        this.getFollowupCount();
        this.getLastDiagnosis();
        this.getLastTreatment();
        this.getLastFollowup();
        this.getAllDocuments();
        this.getLastSessionDiseasesAndRecommendation();
        this.getLastAudiologyTest();
        this.getLastSpeechTest();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
    }
    addDiagnosis() {
        this.sharedClass.goToAddDiagnosis(this.router);
    }
    addTreatment() {
        this.sharedClass.goToAddTreatment(this.router);
    }
    addFollowup() {
        this.sharedClass.goToAddFollowup(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    getPatientHistoryData() {
        this.spinner.show();
        this.patientSession
            .getAllSessions(this.selectedPatient.id)
            .subscribe(async (result) => {
                this.patientHistoryData = result;
                this.patientHistoryData.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                this.spinner.hide();
            });
    }
    openDataPage(data) {
        localStorage.setItem("sessionBasicInfo", JSON.stringify(data));
        if (data.sessionTypeId === 0) {
            this.addDiagnosis();
        } else if (data.sessionTypeId === 1) {
            this.addTreatment();
        } else {
            this.addFollowup();
        }
    }
    async getDiagnosisCount() {
        this.spinner.show();
        this.patientSession
            .getSessionCountByType(0, this.selectedPatient.id)
            .subscribe(async (result) => {
                this.diagnosisCount = result.count;
                this.spinner.hide();
            });
    }
    async getTreatmentCount() {
        this.spinner.show();
        this.patientSession
            .getSessionCountByType(1, this.selectedPatient.id)
            .subscribe(async (result) => {
                this.treatmentsCount = result.count;
                this.spinner.hide();
            });
    }
    async getFollowupCount() {
        this.spinner.show();
        this.patientSession
            .getSessionCountByType(2, this.selectedPatient.id)
            .subscribe(async (result) => {
                this.followupCount = result.count;
                this.spinner.hide();
            });
    }
    getLastDiagnosis() {
        this.spinner.show();
        this.patientSession
            .getLastSessionByType(0, this.selectedPatient.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    this.lastDiagnosis = result[0];
                }
                this.spinner.hide();
            });
    }
    getLastTreatment() {
        this.spinner.show();
        this.patientSession
            .getLastSessionByType(1, this.selectedPatient.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    this.lastTreatment = result[0];
                }
                this.spinner.hide();
            });
    }
    getLastFollowup() {
        this.spinner.show();
        this.patientSession
            .getLastSessionByType(2, this.selectedPatient.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    this.lastFollowup = result[0];
                }
                this.spinner.hide();
            });
    }
    getLastAudiologyTest() {
        this.spinner.show();
        this.patientSession
            .getLastTestByDepartmentId(this.selectedPatient.id, 2, 0)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    result.forEach((element) => {
                        const [last] = element.sessionTests.slice(-1);
                        this.lastAudiologyTest = last;
                    });
                }
                this.spinner.hide();
            });
    }
    getLastSpeechTest() {
        this.spinner.show();
        this.patientSession
            .getLastTestByDepartmentId(this.selectedPatient.id, 3, 0)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    result.forEach((element) => {
                        const [last] = element.sessionTests.slice(-1);
                        this.lastSpeechTest = last;
                    });
                }
                this.spinner.hide();
            });
    }
    getLastSessionDiseasesAndRecommendation() {
        this.spinner.show();
        this.patientSession
            .getLastSessionDiseasesAndRecommendation(this.selectedPatient.id)
            .subscribe(async (result) => {
                this.lastSessionDiseasesAndRecommendations = result;
                this.spinner.hide();
            });
    }
    getAllDocuments() {
        this.spinner.show();
        this.documentService
            .getAllFiles(`Patient/${this.selectedPatient.id}`)
            .then((data) => {
                this.allDocuments = data.Contents;
                this.spinner.hide();
            })
            .catch((err) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "An error occured while processing your request. Please Contact the system administrator."
                );
                this.spinner.hide();
            });
    }
    removeKey(text) {
        return text.replace(`Patient/${this.selectedPatient.id}/`, "");
    }
    formatBytes(bytes, decimals = 2) {
        return this.sharedClass.formatBytes(bytes);
    }
    viewDocument(document) {
        this.documentService.getFileUrl(document.Key).then((data) => {});
    }
    onClickMenu() {
        this.addNewSessionMenu = [
            {
                label: "Add Diagnosis",
                icon: "fa fa-stethoscope",
                command: () => {
                    this.addDiagnosis();
                },
            },
            {
                label: "Add Treatment",
                icon: "fa fa-medkit",
                command: () => {
                    this.addTreatment();
                },
            },
            {
                label: "Add Follow Up",
                icon: "fa fa-ambulance",
                command: () => {
                    this.addFollowup();
                },
            },
        ];
    }
}
