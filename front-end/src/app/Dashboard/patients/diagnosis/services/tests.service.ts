import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TestsService {
    apiUrl = environment.patientApiUrl;
    sessionTestsLink = "session-tests";
    parameterValueLink = "parameterValue";
    sessionTestEquipmentLink = "sessionTestEquipment";
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
    createSessionTest(data): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.sessionTestsLink}`,
            data
        );
    }
    getTestParametersValues(sessionTestId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.parameterValueLink}?filter[where][sessionTestId][eq]=${sessionTestId}`
        );
    }
    getSessionTestEquipment(sessionTestId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestEquipmentLink}?filter[where][sessionTestId][eq]=${sessionTestId}`
        );
    }
}
