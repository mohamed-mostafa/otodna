import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
    @Input() value;
    @Input() type;
    constructor() {}

    ngOnInit(): void {}
    checkRightListItem(item) {
        // this.rightListItems.forEach((element) => {
        //     if (element === item.values) {
        //         this.rightListItems = [];
        //     }
        // });
        // if (item.rightVal.values) {
        //     this.rightListItems.push(item.values);
        //     item.values.forEach((val) => {
        //         if (val.values === item.rightVal.values) {
        //             val.showRight = true;
        //         } else {
        //             val.showRight = false;
        //             val.rightVal = "";
        //         }
        //     });
        // } else {
        //     item.values.forEach((val) => {
        //         val.showRight = false;
        //         val.rightVal = "";
        //     });
        // }
    }
    checkLeftListItem(item) {
        // this.leftListItems.forEach((element) => {
        //     if (element === item.values) {
        //         this.leftListItems = [];
        //     }
        // });
        // if (item.leftVal.values) {
        //     this.leftListItems.push(item.values);
        //     item.values.forEach((val) => {
        //         if (val.values === item.leftVal.values) {
        //             val.showLeft = true;
        //         } else {
        //             val.showLeft = false;
        //             val.leftVal = "";
        //         }
        //     });
        // } else {
        //     this.leftListItems.filter((r) => r !== item.values);
        //     item.values.forEach((val) => {
        //         val.showLeft = false;
        //         val.leftVal = "";
        //     });
        // }
    }
}
