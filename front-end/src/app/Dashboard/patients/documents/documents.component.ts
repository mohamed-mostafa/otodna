import { MessageService } from "primeng/api";
import { UploadFilesService } from "./../../services/upload-files.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-documents",
    templateUrl: "./documents.component.html",
    styleUrls: ["./documents.component.css"],
    providers: [MessageService],
})
export class DocumentsComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    selectedPatient;
    toFile: any[] = [];
    file;
    constructor(
        private router: Router,
        private spinner: NgxSpinnerService,
        private uploadService: UploadFilesService,
        private messageService: MessageService
    ) {}

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
    uploadFiles(event) {
        this.spinner.show();
        this.toFile = event.files;
        this.uploadService
            .fileUpload(this.toFile, `Patient/${this.selectedPatient.id}`)
            .then((data) => {
                this.spinner.hide();
                this.showMessage(
                    "success",
                    "Updated",
                    "File uploaded successfully"
                );
                this.toFile.splice(0, this.toFile.length);
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
}
