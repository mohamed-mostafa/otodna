import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class ReferralsService {
    apiUrl = environment.patientApiUrl;
    link = "patient-referrals";
    constructor(private http: HttpClient) {}

    getAllReferrals(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteReferral(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateReferral(referral): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${referral.id}`,
            referral
        );
    }
    createReferral(referral): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, referral);
    }
}
