import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LabResultsService {
    apiUrl = environment.patientApiUrl;
    link = "/patientLabResults";
    constructor(private http: HttpClient) {}

    getAllLabResults(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteLabResult(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateLabResult(labResult): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${labResult.id}`,
            labResult
        );
    }
    createLabResult(labResult): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, labResult);
    }
}
