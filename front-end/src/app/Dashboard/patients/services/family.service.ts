import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class FamilyService {
    apiUrl = environment.patientApiUrl;
    link = "patientFamilyMembers";
    constructor(private http: HttpClient) {}

    getAllFamilies(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteFamilyMember(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateFamilyMember(family): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${family.id}`,
            family
        );
    }
    createFamilyMember(family): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, family);
    }
    getAllPatientMemberRelationType(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/patientMemberRelationType`);
    }
    getPatientMemberRelationTypeById(id: String): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/patientMemberRelationType/${id}`
        );
    }
}
