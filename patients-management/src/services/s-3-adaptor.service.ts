import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {S3} from 'aws-sdk/clients/all';
require('dotenv').config();

@injectable({scope: BindingScope.SINGLETON})
export class S3AdaptorService {
  secret: any;
  allTreatments: any;
  allPathologies: any;
  constructor(/* Add @inject to inject parameters */) {
    this.secret = new S3({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });
    this.loadTreatments();
    this.loadPathologies();
  }
  async getAllTreatments() {
    return new Promise(resolve => {
      if (this.allTreatments) {
        resolve(this.allTreatments);
      } else {
        resolve(this.loadTreatments());
      }
    });
  }
  async loadTreatments() {
    return new Promise((resolve, reject) => {
      console.log('Loading Json Files from Treatments');
      const bucket = this.secret;
      const params = {
        Bucket: 'otonda-upload-file',
        Key: `assets/tests/treatmentTests.json`,
        ResponseContentType: 'application/json',
      };
      bucket.getObject(params, (err: any, items: any) => {
        if (err) {
          console.log(err);
          reject(JSON.stringify(err));
        } else {
          this.allTreatments = JSON.parse(
            items.Body.toString(),
          ).taggedTreatments;
          console.log('Resolving Treatments');
          resolve(this.allTreatments);
        }
      });
    });
  }
  async getAllPathologies() {
    return new Promise(resolve => {
      if (this.allPathologies) {
        resolve(this.allPathologies);
      } else {
        resolve(this.loadPathologies());
      }
    });
  }
  async loadPathologies() {
    return new Promise((resolve, reject) => {
      console.log('Loading Json Files from Pathology');
      const bucket = this.secret;
      const params = {
        Bucket: 'otonda-upload-file',
        Key: `assets/tests/diagnosisPathology.json`,
        ResponseContentType: 'application/json',
      };
      bucket.getObject(params, (err: any, items: any) => {
        if (err) {
          console.log(err);
          reject(JSON.stringify(err));
        } else {
          this.allPathologies = JSON.parse(
            items.Body.toString(),
          ).taggedPathologies;
          console.log('Resolving Pathology');
          resolve(this.allPathologies);
        }
      });
    });
  }
}
