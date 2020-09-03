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
    @Input() savedRightFiles;
    @Input() savedLeftFiles;
    @Input() rightFilePath;
    @Input() leftFilePath;
    @Input() savedRightImage;
    @Input() savedLeftImage;
    sharedClass: SharedClass = new SharedClass();
    previewRightImageUrl: any = null;
    previewLeftImageUrl: any = null;
    rightImage: any[] = [];
    leftImage: any[] = [];
    rightFiles: any[] = [];
    leftFiles: any[] = [];
    leftDocument;
    rightDocument;
    leftDeletedImage;
    rightDeletedImage;
    showRightButtons = true;
    showLeftButtons = true;
    constructor(private documentService: DocumentsService) {}

    ngOnInit(): void {}
    async previewRightImage(event) {
        this.rightImage = event.currentFiles;
        this.previewRightImageUrl = await this.sharedClass.previewImage(event);
        this.showRightButtons = false;
    }
    async previewLeftImage(event) {
        this.leftImage = event.currentFiles;
        this.previewLeftImageUrl = await this.sharedClass.previewImage(event);
        this.showLeftButtons = false;
    }
    viewDocument(document) {
        this.documentService.getFileUrl(document.Key).then((data) => {});
    }
    deleteRightDocument(document) {
        this.rightDocument = document;
        this.savedRightFiles = this.savedRightFiles.filter(
            (obj) => obj !== document
        );
    }
    deleteLeftDocument(document) {
        this.leftDocument = document;
        this.savedLeftFiles = this.savedLeftFiles.filter(
            (obj) => obj !== document
        );
    }
    selectedRightFiles(event) {
        this.rightFiles = event.currentFiles;
    }
    selectedLeftFiles(event) {
        this.leftFiles = event.currentFiles;
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
        this.rightDeletedImage = image;
        this.savedRightImage = this.savedRightImage.filter(
            (obj) => obj !== image
        );
    }
    removeLeftImage(image) {
        this.leftDeletedImage = image;
        this.savedLeftImage = this.savedLeftImage.filter(
            (obj) => obj !== image
        );
    }
    replaceRightImage(event, image) {
        this.removeRightImage(image);
        this.previewRightImage(event);
    }
    replaceLeftImage(event, image) {
        this.removeLeftImage(image);
        this.previewLeftImage(event);
    }
    removeChoosedRightImage() {
        this.rightImage = [];
        this.previewRightImageUrl = "";
        this.showRightButtons = true;
    }
    removeChoosedLeftImage() {
        this.leftImage = [];
        this.previewLeftImageUrl = "";
        this.showLeftButtons = true;
    }
    replaceChoosedRightImage(event) {
        this.removeChoosedRightImage();
        this.previewRightImage(event);
    }
    replaceChoosedLeftImage(event) {
        this.removeChoosedLeftImage();
        this.previewLeftImage(event);
    }
}
