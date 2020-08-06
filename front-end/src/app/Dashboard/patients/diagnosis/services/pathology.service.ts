import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PathologyService {
    apiUrl = environment.patientApiUrl;
    link = "patient-session-pathologies";
    constructor(private http: HttpClient) {}

    getAllPathologies(patientSessionId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientSessionId][eq]=${patientSessionId}`
        );
    }
    createPathology(data): Observable<void> {
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
