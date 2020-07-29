import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CandidacyService {
    apiUrl = environment.patientApiUrl;
    link = "session-treatments";
    constructor(private http: HttpClient) {}

    getAllCandidacies(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}`);
    }
    createCandidacy(data): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, data);
    }
    getTest(test) {
        return this.http
            .get<any>(`assets/tests/${test}.json`)
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
}
