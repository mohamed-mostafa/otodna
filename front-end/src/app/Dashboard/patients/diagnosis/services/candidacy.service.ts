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
    parameterValueLink = "parameterValue";
    sessionTestEquipmentLink = "/sessionTreatmentEquipment";
    constructor(private http: HttpClient) {}

    getAllCandidacies(patientSessionId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[include][][relation]=parameterValues&filter[where][patientSessionId][eq]=${patientSessionId}`
        );
    }
    getSessionCandidaciesCounter(patientSessionId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}/count?[where][patientSessionId][eq]=${patientSessionId}`
        );
    }
    getFrequentlyUsedCandidacies(departmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/frequentlyUsedCandidacies/${departmentId}`
        );
    }
    createCandidacy(data): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, data);
    }
    deleteCandidacy(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    getTest(test) {
        return this.http
            .get<any>(`assets/tests/${test}.json`)
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
    getTestParametersValues(sessionTreatmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.parameterValueLink}?filter[where][sessionTreatmentId][eq]=${sessionTreatmentId}`
        );
    }
    getSessionTestEquipment(sessionTreatmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestEquipmentLink}?filter[where][sessionTreatmentId][eq]=${sessionTreatmentId}`
        );
    }
}
