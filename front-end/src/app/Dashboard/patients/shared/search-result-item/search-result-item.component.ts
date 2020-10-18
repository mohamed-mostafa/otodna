import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";
@Component({
    selector: "app-search-result-item",
    templateUrl: "./search-result-item.component.html",
    styleUrls: ["./search-result-item.component.css"],
})
export class SearchResultItemComponent implements OnInit {
    @Input() allTests;
    @Output() testEvent = new EventEmitter<any>();
    items: MenuItem[];
    home: MenuItem;
    showBreadCrumb = false;
    newItems = [];
    tests = [];
    constructor() {}

    ngOnInit(): void {
        this.home = { icon: "fa fa-medkit" };
        this.tests = this.allTests;
    }
    openTestData(test) {
        if (test.children) {
            let obj = {
                label: test.diseaseName,
            };
            this.newItems.push(obj);
            this.items = this.newItems;
            this.showBreadCrumb = true;
            this.tests = test.children;
        } else {
            this.testEvent.emit(test);
            this.tests = this.allTests;
            this.newItems = [];
            this.items = [];
            this.showBreadCrumb = false;
        }
    }
}
