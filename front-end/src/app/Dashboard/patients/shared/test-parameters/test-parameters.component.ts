import { PatientService } from "./../../services/patient.service";
import { DocumentsService } from "./../../../services/documents.service";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../sharedFunctions";

@Component({
    selector: "app-test-parameters",
    templateUrl: "./test-parameters.component.html",
    styleUrls: ["./test-parameters.component.css"],
})
export class TestParametersComponent implements OnInit {
    @Input() parameters;
    @Input() rightFilePath;
    @Input() leftFilePath;
    @Input() showDialogRightData;
    @Input() showDialogLeftData;
    @Input() readonly;
    sharedClass: SharedClass = new SharedClass(this.patientService);
    rightGraphValues = [];
    leftGraphValues = [];
    leftDeletedFiles = [];
    rightDeletedFiles = [];
    leftDeletedImages = [];
    rightDeletedImages = [];
    rightGraphData: any;
    leftGraphData: any;
    rightCellsData = [];
    leftCellsData = [];
    rightPointStyles = [];
    leftPointStyles = [];
    disableLeftDialogTest = false;
    disableRightDialogTest = false;
    showTable = true;
    constructor(
        private documentService: DocumentsService,
        private patientService: PatientService
    ) {}
    ngOnInit(): void {
        this.checkCheckboxSelection();
        this.parameters.forEach((element) => {
            if (element.type === "graph") {
                if (this.readonly) {
                    this.showTable = false;
                } else {
                    this.showTable = true;
                }
                this.rightGraphData = {
                    labels: element.xAxis,
                    datasets: [
                        {
                            label: element.name,
                            data: this.rightGraphValues,
                            fill: true,
                            borderColor: "#4bc0c0",
                        },
                    ],
                };
                this.leftGraphData = {
                    labels: element.xAxis,
                    datasets: [
                        {
                            label: element.name,
                            data: this.leftGraphValues,
                            fill: true,
                            borderColor: "#4bc0c0",
                        },
                    ],
                };
            }
        });
        this.loadTableGraphData();
    }
    loadTableGraphData() {
        this.parameters.forEach((element) => {
            if (element.type === "table") {
                this.drawRightGraph(
                    element.cells,
                    element.name,
                    element.color,
                    element.rightPointStyle,
                    element.cellType === "numberWithCheckbox"
                        ? element.noResponseRightPointStyle
                        : null,
                    element.lineTension
                );
                this.drawLeftGraph(
                    element.cells,
                    element.name,
                    element.color,
                    element.leftPointStyle,
                    element.cellType === "numberWithCheckbox"
                        ? element.noResponseRightPointStyle
                        : null,
                    element.lineTension
                );
            }
        });
    }
    async previewRightImage(event, data) {
        data.rightVal = event.currentFiles;
        data.rightUrl = await this.sharedClass.previewImage(event);
        data.showRightUploadBtn = false;
    }
    async previewLeftImage(event, data) {
        data.leftVal = event.currentFiles;
        data.leftUrl = await this.sharedClass.previewImage(event);
        data.showLeftUploadBtn = false;
    }
    viewDocument(document) {
        this.documentService.getFileUrl(document.Key).then((data) => {});
    }
    deleteRightFile(document) {
        this.rightDeletedFiles.push(document.retrievedRightFile[0].Key);
        document.retrievedRightFile = [];
    }
    deleteLeftFile(document) {
        this.leftDeletedFiles.push(document.retrievedLeftFile[0].Key);
        document.retrievedLeftFile = [];
    }
    selectedRightFiles(event, data) {
        data.rightVal = event.currentFiles;
    }
    selectedLeftFiles(event, data) {
        data.leftVal = event.currentFiles;
    }
    formatBytes(bytes) {
        return this.sharedClass.formatBytes(bytes);
    }
    removeFileRightKey(text) {
        return text.replace(`${this.rightFilePath}/`, "");
    }
    removeFileLeftKey(text) {
        return text.replace(`${this.leftFilePath}/`, "");
    }
    appendUrl(key) {
        return `https://otonda-upload-file.s3-ap-southeast-1.amazonaws.com/${key}`;
    }
    removeRightImage(image) {
        this.rightDeletedImages.push(image.retrievedRightImage[0].Key);
        image.retrievedRightImage = [];
    }
    removeLeftImage(image) {
        this.leftDeletedImages.push(image.retrievedLeftImage[0].Key);
        image.retrievedLeftImage = [];
    }
    replaceRightImage(event, data) {
        this.removeRightImage(data);
        this.previewRightImage(event, data);
    }
    replaceLeftImage(event, data) {
        this.removeLeftImage(data);
        this.previewLeftImage(event, data);
    }
    removeChosenRightImage(data) {
        data.rightVal = "";
        data.rightUrl = "";
        data.showRightUploadBtn = true;
    }
    removeChosenLeftImage(data) {
        data.leftVal = "";
        data.leftUrl = "";
        data.showLeftUploadBtn = true;
    }
    replaceChosenRightImage(event, data) {
        this.removeChosenRightImage(data);
        this.previewRightImage(event, data);
    }
    replaceChosenLeftImage(event, data) {
        this.removeChosenLeftImage(data);
        this.previewLeftImage(event, data);
    }
    drawRightGraph(cells, name, color, pointStyle, noResponse, lineTension) {
        const drawGraph = this.parameters.some((p) => p.type === "graph");
        if (drawGraph) {
            const graphData = this.parameters.filter((p) => p.type === "graph");
            this.rightGraphValues = [];
            this.rightPointStyles = [];
            cells.forEach((cell) => {
                if (cell.right || cell.right === 0) {
                    let img;
                    if (cell.rightCheckbox) {
                        (img = new Image(20, 20)), (img.src = noResponse);
                        this.rightPointStyles.push(img);
                    } else if (pointStyle.startsWith("assets")) {
                        (img = new Image(20, 20)), (img.src = pointStyle);
                        this.rightPointStyles.push(img);
                    } else {
                        this.rightPointStyles.push(pointStyle);
                    }
                    this.rightGraphValues.push(cell.right);
                    this.rightCellsData.push({
                        label: name,
                        data: this.rightGraphValues,
                        fill: false,
                        borderColor: color,
                        pointStyle: this.rightPointStyles,
                        spanGaps: true,
                        pointBorderWidth: 7,
                        lineTension,
                    });
                    this.rightCellsData.reduceRight((acc, obj, i) => {
                        acc[obj.borderColor]
                            ? this.rightCellsData.splice(i, 1)
                            : (acc[obj.borderColor] = true);
                        return acc;
                    }, Object.create(null));
                    this.rightGraphData = {
                        labels: graphData[0].xAxis,
                        datasets: this.rightCellsData,
                    };
                } else {
                    this.rightGraphValues.push(null);
                    this.rightPointStyles.push(null);
                }
            });
        }
    }
    drawLeftGraph(cells, name, color, pointStyle, noResponse, lineTension) {
        const drawGraph = this.parameters.some((p) => p.type === "graph");
        if (drawGraph) {
            const graphData = this.parameters.filter((p) => p.type === "graph");
            this.leftGraphValues = [];
            this.leftPointStyles = [];
            cells.forEach((cell) => {
                if (cell.left || cell.left === 0) {
                    let img;
                    if (cell.leftCheckbox) {
                        (img = new Image(20, 20)), (img.src = noResponse);
                        this.leftPointStyles.push(img);
                    } else if (pointStyle.startsWith("assets")) {
                        (img = new Image(20, 20)), (img.src = pointStyle);
                        this.leftPointStyles.push(img);
                    } else {
                        this.leftPointStyles.push(pointStyle);
                    }
                    this.leftGraphValues.push(cell.left);
                    this.leftCellsData.push({
                        label: name,
                        data: this.leftGraphValues,
                        fill: false,
                        borderColor: color,
                        pointStyle: this.leftPointStyles,
                        spanGaps: true,
                        pointBorderWidth: 7,
                        lineTension,
                    });
                    this.leftCellsData.reduceRight((acc, obj, i) => {
                        acc[obj.borderColor]
                            ? this.leftCellsData.splice(i, 1)
                            : (acc[obj.borderColor] = true);
                        return acc;
                    }, Object.create(null));
                    this.leftGraphData = {
                        labels: graphData[0].xAxis,
                        datasets: this.leftCellsData,
                    };
                } else {
                    this.leftGraphValues.push(null);
                    this.leftPointStyles.push(null);
                }
            });
        }
    }
    checkCheckboxSelection() {
        if (!this.showDialogRightData) {
            this.disableLeftDialogTest = true;
        } else {
            this.disableLeftDialogTest = false;
        }
        if (!this.showDialogLeftData) {
            this.disableRightDialogTest = true;
        } else {
            this.disableRightDialogTest = false;
        }
    }
}
