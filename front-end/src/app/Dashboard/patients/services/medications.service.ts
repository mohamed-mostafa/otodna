import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MedicationsService {
    apiUrl = environment.patientApiUrl;
    link = "/patientMedications";
    constructor(private http: HttpClient) {}

    getAllMedications(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteMedication(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateMedication(medication): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${medication.id}`,
            medication
        );
    }
    createMedication(medication): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, medication);
    }
}
