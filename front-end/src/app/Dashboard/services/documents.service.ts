import { Injectable } from "@angular/core";
import * as S3 from "aws-sdk/clients/s3";
@Injectable({
    providedIn: "root",
})
export class DocumentsService {
    secret;
    constructor() {
        this.secret = new S3({
            accessKeyId: "AKIAJIOWDS66QFPZS52A",
            secretAccessKey: "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",
            region: "ap-southeast-1",
        });
    }
    fileUpload(files, filePath): Promise<any> {
        return new Promise((resolve, reject) => {
            Array.from(files).forEach((file: any) => {
                const contentType = file.type;
                const path = `${filePath}/${file.name}`;
                const bucket = this.secret;
                const params = {
                    Bucket: "otonda-upload-file",
                    Key: path,
                    Body: file,
                    ACL: "public-read",
                    ContentType: contentType,
                };
                bucket.upload(params, function (err, data) {
                    if (err) {
                        reject(JSON.stringify(err));
                    }
                    resolve("File Uploaded.");
                });
            });
        });
    }
    getAllFiles(filePath): Promise<any> {
        return new Promise((resolve, reject) => {
            const bucket = this.secret;
            const params = {
                Bucket: "otonda-upload-file",
                Delimiter: "/",
                Prefix: filePath + "/",
            };
            bucket.listObjects(params, function (err, data) {
                if (err) {
                    reject(JSON.stringify(err));
                }
                resolve(data);
            });
        });
    }
    deleteFile(filePath): Promise<any> {
        return new Promise((resolve, reject) => {
            const bucket = this.secret;
            const params = {
                Bucket: "otonda-upload-file",
                Key: filePath,
            };
            bucket.deleteObject(params, function (err, data) {
                if (err) {
                    reject(JSON.stringify(err));
                }
                resolve("deleted");
            });
        });
    }
    getFileUrl(filePath): Promise<any> {
        return new Promise((resolve, reject) => {
            const bucket = this.secret;
            const params = {
                Bucket: "otonda-upload-file",
                Key: filePath,
            };
            bucket.getObject(params, function (err, data) {
                if (err) {
                    reject(JSON.stringify(err));
                }
                let blob = new Blob([data.Body], { type: data.ContentType });
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                const n = filePath.lastIndexOf("/");
                const result = filePath.substring(n + 1);
                link.download = result;
                link.click();
            });
        });
    }
}
