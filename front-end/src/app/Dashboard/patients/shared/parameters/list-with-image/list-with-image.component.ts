import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-list-with-image",
    templateUrl: "./list-with-image.component.html",
    styleUrls: ["./list-with-image.component.css"],
})
export class ListWithImageComponent implements OnInit {
    @Input() value;
    @Input() type;
    @Input() readonly;
    constructor() {}

    ngOnInit(): void {}
}
