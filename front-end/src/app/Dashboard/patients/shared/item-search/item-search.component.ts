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
    constructor() {}

    ngOnInit(): void {}
    filterTest(event) {
        const query = event.query;
        for (const item of this.items) {
            if (
                item[this.displayName]
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                item.show = false;
            } else {
                item.show = true;
            }
        }
        this.filterEvent.emit(this.items);
    }
}
