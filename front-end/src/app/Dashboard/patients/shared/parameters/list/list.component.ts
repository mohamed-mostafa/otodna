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
    @Input() readonly;
    rightListParameters = [];
    leftListParameters = [];
    constructor() {}

    ngOnInit(): void {
        this.checkRightListItem(this.value);
        this.checkLeftListItem(this.value);
    }
    checkRightListItem(item) {
        if (
            item.rightVal.conditionalParametersNames &&
            item.rightVal.conditionalParametersNames.length > 0
        ) {
            item.rightVal.conditionalParametersNames.forEach((r) => {
                this.parameters.forEach((param) => {
                    if (r === param.name) {
                        this.rightListParameters.push(param);
                    } else {
                        let res = item.rightVal.conditionalParametersNames.some(
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
                item.rightVal.conditionalParametersNames &&
                item.rightVal.conditionalParametersNames.length > 0
            ) {
                item.rightVal.conditionalParametersNames.forEach((right) => {
                    this.rightListParameters.forEach((element) => {
                        if (element.name === right) {
                            element.showRight = true;
                        } else {
                            let res = item.rightVal.conditionalParametersNames.some(
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
                item.rightVal.conditionalParametersNames &&
                item.rightVal.conditionalParametersNames.length > 0
            ) {
                this.rightListParameters.forEach((element) => {
                    item.rightVal.conditionalParametersNames.forEach(
                        (right) => {
                            if (element.name === right && element.conditional) {
                                element.showRight = true;
                            }
                        }
                    );
                });
            } else {
                item.values.forEach((val) => {
                    this.rightListParameters.forEach((element) => {
                        if (
                            val.conditionalParametersNames &&
                            val.conditionalParametersNames.length > 0
                        ) {
                            val.conditionalParametersNames.forEach((right) => {
                                if (
                                    element.name === right &&
                                    element.conditional
                                ) {
                                    element.showRight = false;
                                    element.rightVal = "";
                                    element.values.forEach((el) => {
                                        if (
                                            el.conditionalParametersNames &&
                                            el.conditionalParametersNames
                                                .length > 0
                                        ) {
                                            this.rightListParameters.forEach(
                                                (param) => {
                                                    el.conditionalParametersNames.forEach(
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
            item.leftVal.conditionalParametersNames &&
            item.leftVal.conditionalParametersNames.length > 0
        ) {
            item.leftVal.conditionalParametersNames.forEach((r) => {
                this.parameters.forEach((param) => {
                    if (r === param.name) {
                        this.leftListParameters.push(param);
                    } else {
                        let res = item.leftVal.conditionalParametersNames.some(
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
                item.leftVal.conditionalParametersNames &&
                item.leftVal.conditionalParametersNames.length > 0
            ) {
                item.leftVal.conditionalParametersNames.forEach((right) => {
                    this.leftListParameters.forEach((element) => {
                        if (element.name === right) {
                            element.showLeft = true;
                        } else {
                            let res = item.leftVal.conditionalParametersNames.some(
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
                item.leftVal.conditionalParametersNames &&
                item.leftVal.conditionalParametersNames.length > 0
            ) {
                this.leftListParameters.forEach((element) => {
                    item.leftVal.conditionalParametersNames.forEach((left) => {
                        if (element.name === left && element.conditional) {
                            element.showLeft = true;
                        }
                    });
                });
            } else {
                item.values.forEach((val) => {
                    this.leftListParameters.forEach((element) => {
                        if (
                            val.conditionalParametersNames &&
                            val.conditionalParametersNames.length > 0
                        ) {
                            val.conditionalParametersNames.forEach((left) => {
                                if (
                                    element.name === left &&
                                    element.conditional
                                ) {
                                    element.showLeft = false;
                                    element.leftVal = "";
                                    element.values.forEach((el) => {
                                        if (
                                            el.conditionalParametersNames &&
                                            el.conditionalParametersNames
                                                .length > 0
                                        ) {
                                            this.leftListParameters.forEach(
                                                (param) => {
                                                    el.conditionalParametersNames.forEach(
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
