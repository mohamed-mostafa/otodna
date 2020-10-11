import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
    @Input() value;
    @Input() type;
    @Input() parameters;
    dependsOnParameters = [];
    constructor() {}

    ngOnInit(): void {
        this.parameters.forEach((element) => {
            if (element.type === "dependsOnList") {
                this.dependsOnParameters.push(element);
            }
        });
    }
    checkRightListItem(item) {
        if (item.type === "list") {
            this.parameters.forEach((element) => {
                if (
                    element.type === "dependsOnList" &&
                    element.name === item.rightVal.childrenName
                ) {
                    element.showRight = true;
                } else {
                    element.showRight = false;
                }
            });
        } else {
            if (item.rightVal.childrenName) {
                this.parameters.forEach((element) => {
                    if (
                        element.type === "dependsOnList" &&
                        element.name === item.rightVal.childrenName
                    ) {
                        element.showRight = true;
                    }
                });
            } else {
                item.values.forEach((val) => {
                    this.parameters.forEach((element) => {
                        if (
                            element.type === "dependsOnList" &&
                            element.name === val.childrenName
                        ) {
                            element.showRight = false;
                            element.rightVal = "";
                            element.values.forEach((el) => {
                                if (el.childrenName) {
                                    this.parameters.forEach((param) => {
                                        if (param.name === el.childrenName) {
                                            param.showRight = false;
                                            param.rightVal = "";
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        }
    }
    checkLeftListItem(item) {
        if (item.type === "list") {
            this.parameters.forEach((element) => {
                if (
                    element.type === "dependsOnList" &&
                    element.name === item.leftVal.childrenName
                ) {
                    element.showLeft = true;
                } else {
                    element.showLeft = false;
                }
            });
        } else {
            if (item.leftVal.childrenName) {
                this.parameters.forEach((element) => {
                    if (
                        element.type === "dependsOnList" &&
                        element.name === item.leftVal.childrenName
                    ) {
                        element.showLeft = true;
                    }
                });
            } else {
                item.values.forEach((val) => {
                    this.parameters.forEach((element) => {
                        if (
                            element.type === "dependsOnList" &&
                            element.name === val.childrenName
                        ) {
                            element.showLeft = false;
                            element.leftVal = "";
                            element.values.forEach((el) => {
                                if (el.childrenName) {
                                    this.parameters.forEach((param) => {
                                        if (param.name === el.childrenName) {
                                            param.showLeft = false;
                                            param.leftVal = "";
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        }
    }
}
