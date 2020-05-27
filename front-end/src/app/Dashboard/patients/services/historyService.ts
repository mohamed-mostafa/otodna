import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HistoryService {
    constructor(private http: HttpClient) {}

    getHistory() {
        return this.http
            .get<any>("assets/demo/data/scheduleevents.json")
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
}
