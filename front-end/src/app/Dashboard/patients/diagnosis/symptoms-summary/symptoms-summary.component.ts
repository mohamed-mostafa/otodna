import { SymptomsService } from "./../services/symptoms.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-symptoms-summary",
    templateUrl: "./symptoms-summary.component.html",
    styleUrls: ["./symptoms-summary.component.css"],
})
export class SymptomsSummaryComponent implements OnInit {
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
        this.symptomsService
            .getPatientSessionSymptoms(this.selectedSession.id)
            .subscribe(async (result) => {
                result.forEach((element) => {
                    if (element.ear === "R") {
                        this.symptoms.push({
                            ear: element.ear,
                            name: element.rightSummaryName,
                        });
                    } else {
                        this.symptoms.push({
                            ear: element.ear,
                            name: element.leftSummaryName,
                        });
                    }
                });
            });
    }
}
