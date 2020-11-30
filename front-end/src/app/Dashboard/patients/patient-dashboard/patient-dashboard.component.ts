import { DocumentsService } from "./../../services/documents.service";
import { PatientService } from "./../services/patient.service";
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
    lastOtologyTest;
    addNewSessionMenu = [];
    showDiseasesAndRecommendationLoading = false;
    showNumberOfDiagnosisLoading = false;
    showNumberOfTreatmentsLoading = false;
    showNumberOfFollowupsLoading = false;
    showLastTreatmentLoading = false;
    showLastDiagnosisLoading = false;
    showLastFollowupLoading = false;
    showLastAudiologyTestLoading = false;
    showLastSpeechTestLoading = false;
    showLastOtologyTestLoading = false;
    showPatientHistoryLoading = false;
    showDocumentsLoading = false;
    showDiseasesAndRecommendationErrorMessage = false;
    showNumberOfDiagnosisErrorMessage = false;
    showNumberOfTreatmentsErrorMessage = false;
    showNumberOfFollowupsErrorMessage = false;
    showLastTreatmentErrorMessage = false;
    showLastDiagnosisErrorMessage = false;
    showLastFollowupErrorMessage = false;
    showLastAudiologyTestErrorMessage = false;
    showLastSpeechTestErrorMessage = false;
    showLastOtologyTestErrorMessage = false;
    showPatientHistoryErrorMessage = false;
    showDocumentsErrorMessage = false;
    errorMessage = "Not available at this moment.";
    constructor(
        private router: Router,
        private patientSession: PatientSessionService,
        private patientService: PatientService,
        private documentService: DocumentsService,
        private messageService: MessageService
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
        this.getSessionsDiseasesAndRecommendation();
        this.getLastAudiologyTest();
        this.getLastSpeechTest();
        this.getLastOtologyTest();
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
        this.showPatientHistoryLoading = true;
        this.patientSession.getAllSessions(this.selectedPatient.id).subscribe(
            async (result) => {
                this.patientHistoryData = result;
                this.patientHistoryData.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                this.showPatientHistoryLoading = false;
            },
            async (error) => {
                console.log(error);
                this.patientHistoryData = [];
                this.showPatientHistoryErrorMessage = true;
                this.showPatientHistoryLoading = false;
            }
        );
    }
    openDataPage(data) {
        if (data) {
            localStorage.setItem("sessionBasicInfo", JSON.stringify(data));
            if (data.sessionTypeId === 0) {
                this.addDiagnosis();
            } else if (data.sessionTypeId === 1) {
                this.addTreatment();
            } else {
                this.addFollowup();
            }
        }
    }
    async getDiagnosisCount() {
        this.showNumberOfDiagnosisLoading = true;
        this.patientSession
            .getSessionCountByType(0, this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    this.diagnosisCount = result.count;
                    this.showNumberOfDiagnosisLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.showNumberOfDiagnosisErrorMessage = true;
                    this.showNumberOfDiagnosisLoading = false;
                }
            );
    }
    async getTreatmentCount() {
        this.showNumberOfTreatmentsLoading = true;
        this.patientSession
            .getSessionCountByType(1, this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    this.treatmentsCount = result.count;
                    this.showNumberOfTreatmentsLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.showNumberOfTreatmentsErrorMessage = true;
                    this.showNumberOfTreatmentsLoading = false;
                }
            );
    }
    async getFollowupCount() {
        this.showNumberOfFollowupsLoading = true;
        this.patientSession
            .getSessionCountByType(2, this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    this.followupCount = result.count;
                    this.showNumberOfFollowupsLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.showNumberOfFollowupsErrorMessage = true;
                    this.showNumberOfFollowupsLoading = false;
                }
            );
    }
    getLastDiagnosis() {
        this.showLastDiagnosisLoading = true;
        this.patientSession
            .getLastSessionByType(0, this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    if (result && result.length > 0) {
                        this.lastDiagnosis = result[0];
                    }
                    this.showLastDiagnosisLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastDiagnosis = [];
                    this.showLastDiagnosisErrorMessage = true;
                    this.showLastDiagnosisLoading = false;
                }
            );
    }
    getLastTreatment() {
        this.showLastTreatmentLoading = true;
        this.patientSession
            .getLastSessionByType(1, this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    if (result && result.length > 0) {
                        this.lastTreatment = result[0];
                    }
                    this.showLastTreatmentLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastTreatment = [];
                    this.showLastTreatmentErrorMessage = true;
                    this.showLastTreatmentLoading = false;
                }
            );
    }
    getLastFollowup() {
        this.showLastFollowupLoading = true;
        this.patientSession
            .getLastSessionByType(2, this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    if (result && result.length > 0) {
                        this.lastFollowup = result[0];
                    }
                    this.showLastFollowupLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastFollowup = [];
                    this.showLastFollowupErrorMessage = true;
                    this.showLastFollowupLoading = false;
                }
            );
    }
    getLastAudiologyTest() {
        this.showLastAudiologyTestLoading = true;
        this.patientSession
            .getLastTestByDepartmentId(this.selectedPatient.id, 2)
            .subscribe(
                async (result) => {
                    if (result) {
                        this.lastAudiologyTest = result;
                    }
                    this.showLastAudiologyTestLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastAudiologyTest = [];
                    this.showLastAudiologyTestErrorMessage = true;
                    this.showLastAudiologyTestLoading = false;
                }
            );
    }
    getLastSpeechTest() {
        this.showLastSpeechTestLoading = true;
        this.patientSession
            .getLastTestByDepartmentId(this.selectedPatient.id, 3)
            .subscribe(
                async (result) => {
                    if (result) {
                        this.lastSpeechTest = result;
                    }
                    this.showLastSpeechTestLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastSpeechTest = [];
                    this.showLastSpeechTestErrorMessage = true;
                    this.showLastSpeechTestLoading = false;
                }
            );
    }
    getLastOtologyTest() {
        this.showLastOtologyTestLoading = true;
        this.patientSession
            .getLastTestByDepartmentId(this.selectedPatient.id, 1)
            .subscribe(
                async (result) => {
                    if (result) {
                        this.lastOtologyTest = result;
                    }
                    this.showLastOtologyTestLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastOtologyTest = [];
                    this.showLastOtologyTestErrorMessage = true;
                    this.showLastOtologyTestLoading = false;
                }
            );
    }
    getSessionsDiseasesAndRecommendation() {
        this.showDiseasesAndRecommendationLoading = true;
        this.patientSession
            .getSessionsDiseasesAndRecommendation(this.selectedPatient.id)
            .subscribe(
                async (result) => {
                    this.lastSessionDiseasesAndRecommendations = result;
                    this.showDiseasesAndRecommendationLoading = false;
                },
                async (error) => {
                    console.log(error);
                    this.lastSessionDiseasesAndRecommendations = [];
                    this.showDiseasesAndRecommendationErrorMessage = true;
                    this.showDiseasesAndRecommendationLoading = false;
                }
            );
    }
    getAllDocuments() {
        this.showDocumentsLoading = true;
        this.documentService
            .getAllFiles(`Patient/${this.selectedPatient.id}`)
            .then((data) => {
                this.allDocuments = data.Contents;
                this.showDocumentsLoading = false;
            })
            .catch((err) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "An error occured while processing your request. Please Contact the system administrator."
                );
                this.showDocumentsLoading = false;
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
