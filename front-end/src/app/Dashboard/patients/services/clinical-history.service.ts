import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class ClinicalHistoryService {
    apiUrl = environment.patientApiUrl;
    link = "clinical-histories";
    constructor(private http: HttpClient) {}

    getAllClinicalHistory(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    getSelectedClinicalHistory(patientId, id): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][and][0][patientId][eq]=${patientId}&filter[where][and][1][${id}][neq]=null`
        );
    }
    deleteClinicalHistory(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateClinicalHistory(clinicalHistory): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${clinicalHistory.id}`,
            clinicalHistory
        );
    }
    createClinicalHistory(clinicalHistory): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.link}`,
            clinicalHistory
        );
    }
}
