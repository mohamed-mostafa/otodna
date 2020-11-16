import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-string",
    templateUrl: "./string.component.html",
    styleUrls: ["./string.component.css"],
})
export class StringComponent implements OnInit {
    @Input() value;
    @Input() type;
    @Input() readonly;
    constructor() {}

    ngOnInit(): void {}
}
