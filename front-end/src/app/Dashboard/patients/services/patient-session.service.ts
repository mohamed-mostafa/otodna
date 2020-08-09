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
    getAllSessions(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    getSessionCount(sessionTypeId, date): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}/count?[where][and][0][sessionTypeId][eq]=${sessionTypeId}&[where][and][1][createdAt][gte]=${date}`
        );
    }
    createSession(session): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, session);
    }
    updateSession(session): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${session.id}`,
            session
        );
    }
}
