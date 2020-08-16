import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { Message } from "primeng/primeng";

@Component({
    selector: "app-session-documents",
    templateUrl: "./session-documents.component.html",
    styleUrls: ["./session-documents.component.css"],
})
export class SessionDocumentsComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    selectedPatient;
    label;
    showButtons = true;
    public href: string = "";
    selectedSession;
    sessionTypeId;
    msgs: Message[];
    uploadedFiles: any[] = [];
    constructor(private router: Router, private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.sessionTypeId = JSON.parse(localStorage.getItem("sessionTypeId"));
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        this.href = this.router.url;
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
                command: (event) => {
                    this.goToPatientPage(event);
                },
            },
            {
                label: this.selectedSession
                    ? this.selectedSession.displayName
                    : this.label,
            },
        ];
        this.home = { icon: "fa fa-stethoscope" };
    }
    goToPatientPage(event) {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/patient"]);
            });
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
