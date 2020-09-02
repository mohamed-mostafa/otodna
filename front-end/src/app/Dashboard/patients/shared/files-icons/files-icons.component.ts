import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-files-icons",
    templateUrl: "./files-icons.component.html",
    styleUrls: ["./files-icons.component.css"],
})
export class FilesIconsComponent implements OnInit {
    @Input() key;
    constructor() {}

    ngOnInit(): void {}
}
