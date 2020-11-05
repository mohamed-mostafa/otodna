import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DepartmentsService {
    apiUrl = environment.userApiUrl;
    link = "departments";

    constructor(private http: HttpClient) {}

    getAllDepartments(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}`);
    }
    getDepartmentById(id: String): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][id][eq]=${id}`
        );
    }
}
