import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

@Component({
    selector: "app-documents",
    templateUrl: "./documents.component.html",
    styleUrls: ["./documents.component.css"],
})
export class DocumentsComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    selectedPatient;
    msgs: Message[];
    uploadedFiles: any[] = [];
    constructor(private router: Router, private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.items = [
            {
                label: "Patients",
                command: (event) => {
                    this.goToDashboard(event);
                },
            },
            {
                label:
                    this.selectedPatient.firstName +
                    " " +
                    this.selectedPatient.lastName,
            },
        ];
        this.home = { icon: "fa fa-user-md" };
    }
    goToDashboard(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard"]);
            });
    }
    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({
            severity: "info",
            summary: "Success",
            detail: "Upload Completed",
        });
    }
}
