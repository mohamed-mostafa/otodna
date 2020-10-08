import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-boolean",
    templateUrl: "./boolean.component.html",
    styleUrls: ["./boolean.component.css"],
})
export class BooleanComponent implements OnInit {
    @Input() value;
    @Input() type;
    constructor() {}

    ngOnInit(): void {}
}
