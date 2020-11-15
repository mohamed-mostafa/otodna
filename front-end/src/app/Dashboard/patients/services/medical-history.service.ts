import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class MedicalHistoryService {
    apiUrl = environment.patientApiUrl;
    link = "medical-histories";
    constructor(private http: HttpClient) {}

    getAllMedicalHistory(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteMedicalHistory(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateMedicalHistory(medicalHistory): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${medicalHistory.id}`,
            medicalHistory
        );
    }
    createMedicalHistory(medicalHistory): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.link}`,
            medicalHistory
        );
    }
}
