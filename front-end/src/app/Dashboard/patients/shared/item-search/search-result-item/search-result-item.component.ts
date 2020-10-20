import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "primeng/primeng";
@Component({
    selector: "app-search-result-item",
    templateUrl: "./search-result-item.component.html",
    styleUrls: ["./search-result-item.component.css"],
})
export class SearchResultItemComponent implements OnInit {
    @Input() allTests;
    @Input() displayName;
    @Output() testEvent = new EventEmitter<any>();
    breadcrumbItems: MenuItem[];
    breadcrumbIcon: MenuItem;
    showBreadCrumb = false;
    newBreadcrumbItems = [];
    items = [];
    itemSearch;
    constructor() {}

    ngOnInit(): void {
        this.breadcrumbIcon = { icon: "fa fa-medkit" };
        this.items = this.allTests;
    }
    openTestData(item) {
        if (item.children) {
            this.items = [];
            const obj = {
                label: item[this.displayName],
                children: item.children,
                command: (event) => {
                    this.showBreadCrumbData(event);
                },
            };
            this.newBreadcrumbItems.push(obj);
            this.breadcrumbItems = this.newBreadcrumbItems;
            this.showBreadCrumb = true;
            item.children.forEach((element) => {
                if (element.children) {
                    this.items.unshift(element);
                } else {
                    this.items.push(element);
                }
            });
            this.itemSearch = [];
        } else {
            this.testEvent.emit(item);
            this.reset();
        }
    }
    showBreadCrumbData(event) {
        this.items = [];
        this.breadcrumbItems.forEach((element, idx) => {
            if (element.label === event.item.label) {
                this.breadcrumbItems.length = idx + 1;
            }
        });
        event.item.children.forEach((element) => {
            if (element.children) {
                this.items.unshift(element);
            } else {
                this.items.push(element);
            }
        });
        this.itemSearch = [];
    }
    searchItems(event) {
        this.items = event;
    }
    reset() {
        this.items = this.allTests;
        this.newBreadcrumbItems = [];
        this.breadcrumbItems = [];
        this.showBreadCrumb = false;
        this.itemSearch = [];
    }
}
