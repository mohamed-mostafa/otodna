import { SymptomsService } from "./../services/symptoms.service";
import { Component, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
    selector: "app-symptoms-summary",
    templateUrl: "./symptoms-summary.component.html",
    styleUrls: ["./symptoms-summary.component.css"],
})
export class SymptomsSummaryComponent implements OnInit {
    @Output() symptomsSummaryEvent = new EventEmitter<any>();
    selectedSession;
    symptoms = [];
    constructor(private symptomsService: SymptomsService) {}
    ngOnInit(): void {
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.getPatientSessionSymptoms();
    }
    getPatientSessionSymptoms() {
        this.symptoms = [];
        this.symptomsService
            .getPatientSessionSymptoms(this.selectedSession.id)
            .subscribe(async (result) => {
                if (result && result.length > 0) {
                    result.forEach((element) => {
                        this.symptoms.push({
                            ear: element.ear,
                            name: element.summaryName,
                        });
                    });
                } 
                // else {
                //     if (this.selectedSession.ended === "true") {
                //         this.symptoms.push({ name: "No Symptoms" });
                //     }
                // }
                this.symptomsSummaryEvent.emit(this.symptoms);
            });
    }
}
