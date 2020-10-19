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
    @Output() searchEvent = new EventEmitter<any>();
    sharedClass: SharedClass = new SharedClass();
    filteredTests: any[];
    constructor() {}

    ngOnInit(): void {}
    filterTest(event) {
        const query = event.query;
        this.searchEvent.emit(this.searchTest(query, this.items));
    }
    searchTest(query, items) {
        const filtered: any[] = [];
        for (const item of items) {
            if (
                item[this.displayName]
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                filtered.push(item);
            }
        }
        return filtered;
    }
}
