import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class TestsService {
    constructor(private http: HttpClient) {}

    getTests() {
        return this.http
            .get<any>("assets/demo/data/diagnosisTests.json")
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
    getAcousticTest() {
        return this.http
            .get<any>("assets/demo/data/acousticTest.json")
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
}
