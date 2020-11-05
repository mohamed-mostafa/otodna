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
    sessionTestEquipment = "session-test-equipments";
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
    getFrequentlyUsedTests(departmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/frequentlyUsedTests/${departmentId}`
        );
    }
    createSessionTest(data): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.sessionTestsLink}`,
            data
        );
    }
    deleteSessionTest(id: String): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${this.sessionTestsLink}/${id}`
        );
    }
    getTestById(id: String): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestsLink}/${id}`
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
    createTestEquipment(data): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.sessionTestEquipment}`,
            data
        );
    }
    getTestEquipmentCount(sessionTestId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.sessionTestEquipment}/count?[where][sessionTestId][eq]=${sessionTestId}`
        );
    }
    deleteTestEquipment(id: String): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${this.sessionTestEquipment}/${id}`
        );
    }
}
