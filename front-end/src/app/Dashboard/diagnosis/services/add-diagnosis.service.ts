import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AddDiagnosisService {
    apiUrl = environment.patientApiUrl;
    link = "patientDiagnosisBasicInfo";
    constructor(private http: HttpClient) {}

    createDiagnosis(diagnosis): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, diagnosis);
    }
}
