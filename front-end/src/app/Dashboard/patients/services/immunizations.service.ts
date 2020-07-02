import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ImmunizationsService {
    apiUrl = environment.patientApiUrl;
    link = "patientImmunizations";
    constructor(private http: HttpClient) {}

    getAllImmunizations(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteImmunization(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateImmunization(immunization): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${immunization.id}`,
            immunization
        );
    }
    createImmunization(immunization): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.link}`,
            immunization
        );
    }
}
