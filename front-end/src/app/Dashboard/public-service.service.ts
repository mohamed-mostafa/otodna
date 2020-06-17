import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PublicServiceService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getAllData(link): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${link}`);
    }
    deleteData(id: String, link): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${link}/${id}`);
    }
    updateData(data, link): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${link}/${data.id}`, data);
    }
    createData(data, link): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${link}/`, data);
    }
}
