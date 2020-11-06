import { TestsService } from "./../../diagnosis/services/tests.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-frequently-used",
    templateUrl: "./frequently-used.component.html",
    styleUrls: ["./frequently-used.component.css"],
})
export class FrequentlyUsedComponent implements OnInit {
    frequentlyUsedTests = [];
    selectedSession;
    @Output() testEvent = new EventEmitter<any>();
    constructor(private testService: TestsService) {}

    ngOnInit(): void {
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.getFrequentlyUsed();
    }
    getFrequentlyUsed() {
        this.testService
            .getFrequentlyUsedTests(this.selectedSession.departmentId)
            .subscribe((result) => {
                this.frequentlyUsedTests = result;
            });
    }
    openTest(test) {
        delete test.departmentId;
        delete test.count;
        this.testEvent.emit(test);
    }
}
