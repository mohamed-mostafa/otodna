import { CandidacyService } from "./../../diagnosis/services/candidacy.service";
import { TreatmentTestsService } from "./../../treatments/services/treatment-tests.service";
import { PathologyService } from "./../../diagnosis/services/pathology.service";
import { TestsService } from "./../../diagnosis/services/tests.service";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-frequently-used",
    templateUrl: "./frequently-used.component.html",
    styleUrls: ["./frequently-used.component.css"],
})
export class FrequentlyUsedComponent implements OnInit {
    frequentlyUsedTests = [];
    selectedSession;
    @Input() type;
    @Output() frequentlyUsedEvent = new EventEmitter<any>();
    constructor(
        private testService: TestsService,
        private pathologyService: PathologyService,
        private treatmentService: TreatmentTestsService,
        private candidacyService: CandidacyService
    ) {}

    ngOnInit(): void {
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.getFrequentlyUsed();
    }
    getFrequentlyUsed() {
        if (this.type === "test") {
            this.testService
                .getFrequentlyUsedTests(this.selectedSession.departmentId)
                .subscribe((result) => {
                    this.frequentlyUsedTests = result;
                });
        } else if (this.type === "treatment") {
            this.treatmentService
                .getFrequentlyUsedTreatments(this.selectedSession.departmentId)
                .subscribe((result) => {
                    this.frequentlyUsedTests = result;
                });
        } else if (this.type === "candidacy") {
            this.candidacyService
                .getFrequentlyUsedCandidacies(this.selectedSession.departmentId)
                .subscribe((result) => {
                    this.frequentlyUsedTests = result;
                });
        } else {
            this.pathologyService
                .getFrequentlyUsedPathologies(this.selectedSession.departmentId)
                .subscribe((result) => {
                    this.frequentlyUsedTests = result;
                });
        }
    }
    openTest(test) {
        delete test.departmentId;
        delete test.count;
        this.frequentlyUsedEvent.emit(test);
    }
}
