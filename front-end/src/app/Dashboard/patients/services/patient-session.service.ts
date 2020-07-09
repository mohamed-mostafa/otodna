import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PatientSessionService {
    apiUrl = environment.patientApiUrl;
    link = "patientSession";
    constructor(private http: HttpClient) {}

    createSession(session): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, session);
    }
}
