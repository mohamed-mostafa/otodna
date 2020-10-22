import { MessageService } from "primeng/api";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-graph",
    templateUrl: "./graph.component.html",
    styleUrls: ["./graph.component.css"],
    providers: [MessageService],
})
export class GraphComponent implements OnInit {
    @Input() rightGraphData;
    @Input() leftGraphData;
    @Input() showDialogRightData;
    @Input() showDialogLeftData;
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {}
    selectRightData(event) {
        this.messageService.add({
            severity: "info",
            summary: "Data Selected",
            detail: this.rightGraphData.datasets[event.element._datasetIndex]
                .data[event.element._index],
        });
    }
    selectLeftData(event) {
        this.messageService.add({
            severity: "info",
            summary: "Data Selected",
            detail: this.leftGraphData.datasets[event.element._datasetIndex]
                .data[event.element._index],
        });
    }
}
