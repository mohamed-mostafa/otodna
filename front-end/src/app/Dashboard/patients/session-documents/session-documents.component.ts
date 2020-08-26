import { DocumentsService } from "./../../services/documents.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-session-documents",
    templateUrl: "./session-documents.component.html",
    styleUrls: ["./session-documents.component.css"],
    providers: [MessageService, ConfirmationService],
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
    toFile: any[] = [];
    file;
    allDocuments = [];
    filePath;
    constructor(
        private router: Router,
        private spinner: NgxSpinnerService,
        private documentService: DocumentsService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.sessionTypeId = JSON.parse(localStorage.getItem("sessionTypeId"));
        this.selectedSession = JSON.parse(
            localStorage.getItem("sessionBasicInfo")
        );
        if (this.sessionTypeId === 0) {
            this.filePath = `Patient/${this.selectedPatient.id}/Diagnosis/${this.selectedSession.id}`;
        } else if (this.sessionTypeId === 1) {
            this.filePath = `Patient/${this.selectedPatient.id}/Treatment/${this.selectedSession.id}`;
        } else {
            this.filePath = `Patient/${this.selectedPatient.id}/Followup/${this.selectedSession.id}`;
        }
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
        this.getAllFiles();
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
    uploadFiles(event) {
        this.spinner.show();
        this.toFile = event.files;
        this.documentService
            .fileUpload(this.toFile, this.filePath)
            .then((data) => {
                this.spinner.hide();
                this.showMessage(
                    "success",
                    "Updated",
                    "File uploaded successfully"
                );
                this.toFile.splice(0, this.toFile.length);
                this.getAllFiles();
            })
            .catch((err) => {
                this.showMessage(
                    "error",
                    "Error",
                    "Something went wrong,Please try again"
                );
            });
    }
    getAllFiles() {
        this.spinner.show();
        this.documentService
            .getAllFiles(this.filePath)
            .then((data) => {
                this.allDocuments = data.Contents;
                this.spinner.hide();
            })
            .catch((err) => {
                this.showMessage(
                    "error",
                    "Error",
                    "Something went wrong,Please try again"
                );
            });
    }
    showMessage(type, title, message) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: message,
            life: 3000,
        });
    }
    deleteDocument(document) {
        this.confirmationService.confirm({
            message: "Do you want to delete this document?",
            header: "Delete Document Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.documentService
                    .deleteFile(document.Key)
                    .then((u: any) => {
                        this.getAllFiles();
                        this.spinner.hide();
                        this.showMessage(
                            "success",
                            "Confirmed",
                            "Document has been deleted"
                        );
                    })
                    .catch((err) => {
                        this.showMessage(
                            "error",
                            "Error",
                            "Something went wrong,Please try again"
                        );
                    });
            },
            reject: () => {
                this.showMessage("info", "Rejected", "You have rejected");
            },
        });
    }
    removeKey(text) {
        return text.replace(`${this.filePath}/`, "");
    }
    viewDocument(document) {
        this.documentService.getFileUrl(document.Key).then((data) => {});
    }
}
