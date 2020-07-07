import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PatientService {
    apiUrl = environment.patientApiUrl;
    link = "patients";
    constructor(private http: HttpClient) {}

    getAllPatients(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}`);
    }
    deletePatient(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updatePatient(patient): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${patient.id}`,
            patient
        );
    }
    createPatient(patient): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.link}/patientWithMedicalInfo`,
            patient
        );
    }
    getFilteredPatient(name, value): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][${name}][eq]=${value}`
        );
    }
    searchPatient(data): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][or][0][firstName][regexp]=/${data}/i&filter[where][or][1][lastName][regexp]=/${data}/i`
        );
    }
    searchSimple(data): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/${this.link}/simpleSearch`,
            data
        );
    }
    searchAdvanced(data): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/${this.link}/advancedSearch`,
            data
        );
    }
    getPatientMedicalInfoById(id: String): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}/${id}/patient-medical-info`
        );
    }
    updatePatientWithMedicalInfo(id, patient): Observable<void> {
        return this.http.put<void>(
            `${this.apiUrl}/${this.link}/patientWithMedicalInfo/${id}`,
            patient
        );
    }
    getPatientsCount(date): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}/count?[where][createdAt][gte]=${date}`
        );
    }
}
