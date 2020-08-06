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
    constructor(private http: HttpClient) {}

    getTest(test) {
        return this.http
            .get<any>(`assets/tests/${test}.json`)
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
    getSessionTests(patientSessionId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestsLink}?filter[where][patientSessionId][eq]=${patientSessionId}`
        );
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
