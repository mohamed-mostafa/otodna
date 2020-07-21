import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SymptomsService {
    apiUrl = environment.patientApiUrl;
    diagnosisLink = "patientDiagnosisSymptoms";
    sessionLink = "patientSessionSymptoms";
    constructor(private http: HttpClient) {}

    getAllSymptoms(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.diagnosisLink}`);
    }
    createSymptoms(data): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.sessionLink}`, data);
    }
    updateSymptoms(id, data): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.sessionLink}/${id}`,
            data
        );
    }
    getPatientSessionSymptoms(patientSessionId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionLink}?filter[where][patientSessionId][eq]=${patientSessionId}`
        );
    }
}
