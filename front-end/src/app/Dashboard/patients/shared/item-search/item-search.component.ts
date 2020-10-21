import { element } from "protractor";
import { SharedClass } from "./../sharedFunctions";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-item-search",
    templateUrl: "./item-search.component.html",
    styleUrls: ["./item-search.component.css"],
})
export class ItemSearchComponent implements OnInit {
    @Input() items;
    @Input() displayName;
    @Input() itemSearch;
    @Output() filterEvent = new EventEmitter<any>();
    sharedClass: SharedClass = new SharedClass();
    filteredTests: any[];
    filtered = new Set();
    constructor() {}

    ngOnInit(): void {}
    filterTest(items) {
        let children = [];
        const query = this.itemSearch;
        for (const item of items) {
            if (
                item[this.displayName]
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                this.filtered.add(item);
            } else {
                for (let element of this.filtered) {
                    if (element === item) {
                        this.filtered.delete(item);
                    }
                }
            }
            if (item.children) {
                children = [...children, ...item.children];
            }
        }
        if (children && children.length > 0) {
            this.filterTest(children);
        }
        this.filterEvent.emit(this.filtered);
    }
}
