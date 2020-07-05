import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProblemsService {
    apiUrl = environment.patientApiUrl;
    link = "patientProblem";
    constructor(private http: HttpClient) {}

    getAllProblems(patientId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][patientId][eq]=${patientId}`
        );
    }
    deleteProblem(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateProblem(problem): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${problem.id}`,
            problem
        );
    }
    createProblem(problem): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, problem);
    }
    getProblemsStatuses(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/statuses`);
    }
    getProblemsStatusById(id: String): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}/statuses/${id}`);
    }
}
