import { DocumentsService } from "./../../services/documents.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-session-documents",
    templateUrl: "./session-documents.component.html",
    styleUrls: ["./session-documents.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class SessionDocumentsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
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
        this.sharedClass.goToPatientPage(this.router);
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    uploadFiles(event) {
        this.spinner.show();
        this.toFile = event.files;
        this.documentService
            .fileUpload(this.toFile, this.filePath)
            .then((data) => {
                this.spinner.hide();
                this.showMessageComponent.showMessage(
                    "success",
                    "Updated",
                    "File uploaded successfully"
                );
                this.toFile.splice(0, this.toFile.length);
                this.getAllFiles();
            })
            .catch((err) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "An error occured while processing your request. Please Contact the system administrator."
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
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "An error occured while processing your request. Please Contact the system administrator."
                );
                this.spinner.hide();
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
                        this.showMessageComponent.showMessage(
                            "success",
                            "Confirmed",
                            "Document has been deleted"
                        );
                    })
                    .catch((err) => {
                        this.showMessageComponent.showMessage(
                            "error",
                            "Error",
                            "An error occured while processing your request. Please Contact the system administrator."
                        );
                    });
            },
            reject: () => {
                this.showMessageComponent.showMessage(
                    "info",
                    "Rejected",
                    "You have rejected"
                );
            },
        });
    }
    removeKey(text) {
        return text.replace(`${this.filePath}/`, "");
    }
    viewDocument(document) {
        this.documentService.getFileUrl(document.Key).then((data) => {});
    }
    formatBytes(bytes, decimals = 2) {
        return this.sharedClass.formatBytes(bytes);
    }
}
