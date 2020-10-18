import { SharedClass } from "./../sharedFunctions";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-item-search",
    templateUrl: "./item-search.component.html",
    styleUrls: ["./item-search.component.css"],
})
export class ItemSearchComponent implements OnInit {
    @Input() items;
    @Input() displayName;
    sharedClass: SharedClass = new SharedClass();
    selectedTest;
    filteredTests: any[];
    constructor() {}

    ngOnInit(): void {}
    filterTest(event) {
        const query = event.query;
        this.searchTest(query, this.items);
    }
    async searchTest(query, items) {
        return await this.sharedClass.searchTest(
            query,
            items,
            this.displayName
        );
    }
}
