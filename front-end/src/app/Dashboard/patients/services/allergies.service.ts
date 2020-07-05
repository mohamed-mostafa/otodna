import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class AllergiesService {
    apiUrl = environment.patientApiUrl;
    link = "patientAllergies";
    constructor(private http: HttpClient) {}

    getAllAllergies(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteAllergy(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateAllergy(allergy): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${allergy.id}`,
            allergy
        );
    }
    createAllergy(allergy): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, allergy);
    }
    getAllAllergyTypes(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/types`);
    }
    getAllergyTypeById(id: String): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/types/${id}`);
    }
    getAllAllergySeverities(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/severities`);
    }
    getAllergySeverityById(id: String): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}/severities/${id}`
        );
    }
    getAllAllergyStatuses(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/statuses`);
    }
    getAllergyStatusById(id: String): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/statuses/${id}`);
    }
}
