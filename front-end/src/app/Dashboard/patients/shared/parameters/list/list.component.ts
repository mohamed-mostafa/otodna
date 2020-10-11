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
    listParameters = [];
    constructor() {}

    ngOnInit(): void {
        this.parameters.forEach((element) => {
            if (element.type === "list" && element.conditional) {
                this.listParameters.push(element);
            }
        });
    }
    checkRightListItem(item) {
        if (!item.conditional) {
            this.listParameters.forEach((element) => {
                if (element.name === item.rightVal.conditionalParameterName) {
                    element.showRight = true;
                } else {
                    element.showRight = false;
                    element.rightVal = "";
                }
            });
        } else {
            if (item.rightVal.conditionalParameterName) {
                this.listParameters.forEach((element) => {
                    if (
                        element.name ===
                            item.rightVal.conditionalParameterName &&
                        element.conditional
                    ) {
                        element.showRight = true;
                    }
                });
            } else {
                item.values.forEach((val) => {
                    this.listParameters.forEach((element) => {
                        if (
                            element.name === val.conditionalParameterName &&
                            element.conditional
                        ) {
                            element.showRight = false;
                            element.rightVal = "";
                            element.values.forEach((el) => {
                                if (el.conditionalParameterName) {
                                    this.listParameters.forEach((param) => {
                                        if (
                                            param.name ===
                                            el.conditionalParameterName
                                        ) {
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
        if (!item.conditional) {
            this.listParameters.forEach((element) => {
                if (element.name === item.leftVal.conditionalParameterName) {
                    element.showLeft = true;
                } else {
                    element.showLeft = false;
                    element.leftVal = "";
                }
            });
        } else {
            if (item.leftVal.conditionalParameterName) {
                this.listParameters.forEach((element) => {
                    if (
                        element.name ===
                            item.leftVal.conditionalParameterName &&
                        element.conditional
                    ) {
                        element.showLeft = true;
                    }
                });
            } else {
                item.values.forEach((val) => {
                    this.listParameters.forEach((element) => {
                        if (
                            element.name === val.conditionalParameterName &&
                            element.conditional
                        ) {
                            element.showLeft = false;
                            element.leftVal = "";
                            element.values.forEach((el) => {
                                if (el.conditionalParameterName) {
                                    this.listParameters.forEach((param) => {
                                        if (
                                            param.name ===
                                            el.conditionalParameterName
                                        ) {
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
