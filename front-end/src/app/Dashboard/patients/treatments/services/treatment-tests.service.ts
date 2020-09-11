import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TreatmentTestsService {
    apiUrl = environment.patientApiUrl;
    sessionTestsLink = "session-treatments";
    parameterValueLink = "parameterValue";
    sessionTestEquipmentLink = "/sessionTreatmentEquipment";
    sessionTreatmentEquipment = "/sessionTreatmentEquipment";
    constructor(private http: HttpClient) {}

    getTreatmentTest(test) {
        return this.http
            .get<any>(`assets/tests/${test}.json`)
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
    getSessionTreatments(patientSessionId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestsLink}?filter[where][patientSessionId][eq]=${patientSessionId}`
        );
    }
    createTreatment(data): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.sessionTestsLink}`,
            data
        );
    }
    deleteTreatment(id: String): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${this.sessionTestsLink}/${id}`
        );
    }
    getTestParametersValues(sessionTreatmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.parameterValueLink}?filter[where][sessionTreatmentId][eq]=${sessionTreatmentId}`
        );
    }
    getSessionTreatmentEquipment(sessionTreatmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestEquipmentLink}?filter[where][sessionTreatmentId][eq]=${sessionTreatmentId}`
        );
    }
    createTreatmentEquipment(data): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.sessionTreatmentEquipment}`,
            data
        );
    }
    getTreatmentEquipmentCount(sessionTreatmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTreatmentEquipment}/count?[where][sessionTreatmentId][eq]=${sessionTreatmentId}`
        );
    }
    deleteTreatmentEquipment(id: String): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${this.sessionTreatmentEquipment}/${id}`
        );
    }
}
