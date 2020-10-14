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
    rightListParameters = [];
    leftListParameters = [];
    notConditional = [];
    constructor() {}

    ngOnInit(): void {
        this.checkRightListItem(this.value);
        this.checkLeftListItem(this.value);
    }
    checkRightListItem(item) {
        if (
            item.rightVal.conditionalParameterName &&
            item.rightVal.conditionalParameterName.length > 0
        ) {
            item.rightVal.conditionalParameterName.forEach((r) => {
                this.parameters.forEach((param) => {
                    if (r === param.name) {
                        this.rightListParameters.push(param);
                    } else {
                        let res = item.rightVal.conditionalParameterName.some(
                            (r) => r === param.name
                        );
                        if (!res) {
                            this.rightListParameters = this.rightListParameters.filter(
                                (a) => a !== param
                            );
                        }
                    }
                });
            });
        }
        if (!item.conditional) {
            if (
                item.rightVal.conditionalParameterName &&
                item.rightVal.conditionalParameterName.length > 0
            ) {
                item.rightVal.conditionalParameterName.forEach((right) => {
                    this.rightListParameters.forEach((element) => {
                        if (element.name === right) {
                            element.showRight = true;
                        } else {
                            let res = item.rightVal.conditionalParameterName.some(
                                (r) => r === element.name
                            );
                            if (!res) {
                                element.showRight = false;
                                element.rightVal = "";
                            }
                        }
                    });
                });
            }
        } else {
            if (
                item.rightVal.conditionalParameterName &&
                item.rightVal.conditionalParameterName.length > 0
            ) {
                this.rightListParameters.forEach((element) => {
                    item.rightVal.conditionalParameterName.forEach((right) => {
                        if (element.name === right && element.conditional) {
                            element.showRight = true;
                        }
                    });
                });
            } else {
                item.values.forEach((val) => {
                    this.rightListParameters.forEach((element) => {
                        if (
                            val.conditionalParameterName &&
                            val.conditionalParameterName.length > 0
                        ) {
                            val.conditionalParameterName.forEach((right) => {
                                if (
                                    element.name === right &&
                                    element.conditional
                                ) {
                                    element.showRight = false;
                                    element.rightVal = "";
                                    element.values.forEach((el) => {
                                        if (
                                            el.conditionalParameterName &&
                                            el.conditionalParameterName.length >
                                                0
                                        ) {
                                            this.rightListParameters.forEach(
                                                (param) => {
                                                    el.conditionalParameterName.forEach(
                                                        (e) => {
                                                            if (
                                                                param.name === e
                                                            ) {
                                                                param.showRight = false;
                                                                param.rightVal =
                                                                    "";
                                                            }
                                                        }
                                                    );
                                                }
                                            );
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
        if (
            item.leftVal.conditionalParameterName &&
            item.leftVal.conditionalParameterName.length > 0
        ) {
            item.leftVal.conditionalParameterName.forEach((r) => {
                this.parameters.forEach((param) => {
                    if (r === param.name) {
                        this.leftListParameters.push(param);
                    } else {
                        let res = item.leftVal.conditionalParameterName.some(
                            (r) => r === param.name
                        );
                        if (!res) {
                            this.leftListParameters = this.leftListParameters.filter(
                                (a) => a !== param
                            );
                        }
                    }
                });
            });
        }
        if (!item.conditional) {
            if (
                item.leftVal.conditionalParameterName &&
                item.leftVal.conditionalParameterName.length > 0
            ) {
                item.leftVal.conditionalParameterName.forEach((right) => {
                    this.leftListParameters.forEach((element) => {
                        if (element.name === right) {
                            element.showLeft = true;
                        } else {
                            let res = item.leftVal.conditionalParameterName.some(
                                (r) => r === element.name
                            );
                            if (!res) {
                                element.showLeft = false;
                                element.leftVal = "";
                            }
                        }
                    });
                });
            }
        } else {
            if (
                item.leftVal.conditionalParameterName &&
                item.leftVal.conditionalParameterName.length > 0
            ) {
                this.leftListParameters.forEach((element) => {
                    item.leftVal.conditionalParameterName.forEach((left) => {
                        if (element.name === left && element.conditional) {
                            element.showLeft = true;
                        }
                    });
                });
            } else {
                item.values.forEach((val) => {
                    this.leftListParameters.forEach((element) => {
                        if (
                            val.conditionalParameterName &&
                            val.conditionalParameterName.length > 0
                        ) {
                            val.conditionalParameterName.forEach((left) => {
                                if (
                                    element.name === left &&
                                    element.conditional
                                ) {
                                    element.showLeft = false;
                                    element.leftVal = "";
                                    element.values.forEach((el) => {
                                        if (
                                            el.conditionalParameterName &&
                                            el.conditionalParameterName.length >
                                                0
                                        ) {
                                            this.leftListParameters.forEach(
                                                (param) => {
                                                    el.conditionalParameterName.forEach(
                                                        (e) => {
                                                            if (
                                                                param.name === e
                                                            ) {
                                                                param.showLeft = false;
                                                                param.leftVal =
                                                                    "";
                                                            }
                                                        }
                                                    );
                                                }
                                            );
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
