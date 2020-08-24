import { Injectable } from "@angular/core";
import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";

@Injectable({
    providedIn: "root",
})
export class UploadFilesService {
    constructor() {}
    fileUpload(files, filePath): Promise<any> {
        return new Promise((resolve, reject) => {
            Array.from(files).forEach((file: any) => {
                const contentType = file.type;
                const path = `${filePath}/${file.name}`;
                const bucket = new S3({
                    accessKeyId: "AKIAJIOWDS66QFPZS52A",
                    secretAccessKey: "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",
                    region: "ap-southeast-1",
                });
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
}
