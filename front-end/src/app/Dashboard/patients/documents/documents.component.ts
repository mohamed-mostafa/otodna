import { DocumentsService } from "./../../services/documents.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { SharedClass } from "../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
@Component({
    selector: "app-documents",
    templateUrl: "./documents.component.html",
    styleUrls: ["./documents.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class DocumentsComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass();
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    selectedPatient;
    toFile: any[] = [];
    file;
    allDocuments = [];
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
        this.getAllFiles();
    }
    goToDashboard(event) {
        this.sharedClass.goToDashboard(this.router);
    }
    uploadFiles(event) {
        this.spinner.show();
        this.toFile = event.files;
        this.documentService
            .fileUpload(this.toFile, `Patient/${this.selectedPatient.id}`)
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
            .getAllFiles(`Patient/${this.selectedPatient.id}`)
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
        return text.replace(`Patient/${this.selectedPatient.id}/`, "");
    }
    viewDocument(document) {
        this.documentService.getFileUrl(document.Key).then((data) => {});
    }
    formatBytes(bytes, decimals = 2) {
        return this.sharedClass.formatBytes(bytes);
    }
}
