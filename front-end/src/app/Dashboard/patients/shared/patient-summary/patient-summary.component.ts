import { TreatmentTestsService } from "./../../treatments/services/treatment-tests.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-patient-summary",
    templateUrl: "./patient-summary.component.html",
    styleUrls: ["./patient-summary.component.css"],
})
export class PatientSummaryComponent implements OnInit {
    selectedPatient;
    allTreatmentsTests;
    constructor(private treatmentService: TreatmentTestsService) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.getAllTreatmentsTests();
    }
    getAllTreatmentsTests() {
        this.treatmentService.getTreatmentTest("treatmentTests").then((res) => {
            this.allTreatmentsTests = res;
            console.log(res);
        });
    }
    getPatientSessionData(){
        
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
