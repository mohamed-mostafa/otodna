import { PatientSessionService } from "./../../services/patient-session.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-patient-summary",
    templateUrl: "./patient-summary.component.html",
    styleUrls: ["./patient-summary.component.css"],
})
export class PatientSummaryComponent implements OnInit {
    selectedPatient;
    patientSessionData;
    constructor(private patientSessionService: PatientSessionService) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.getPatientSessionData();
    }
    getPatientSessionData() {
        this.patientSessionService
            .getPatientTags(this.selectedPatient.id)
            .subscribe((res) => {
                this.patientSessionData = res;
            });
    }
    getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
