import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class VitalService {
    apiUrl = environment.patientApiUrl;
    link = "/patientVital";
    constructor(private http: HttpClient) {}

    getAllVitals(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteVital(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateVital(vital): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${vital.id}`,
            vital
        );
    }
    createVital(vital): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, vital);
    }
}
