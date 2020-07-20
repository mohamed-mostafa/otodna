import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class TestsService {
    constructor(private http: HttpClient) {}

    getTest(test) {
        return this.http
            .get<any>(`assets/tests/${test}.json`)
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
}
