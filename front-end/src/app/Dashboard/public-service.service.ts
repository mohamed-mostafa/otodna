import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PublicServiceService {
    selectedUser = JSON.parse(localStorage.getItem("user"));
    token = this.selectedUser.token;
    headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
    });

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllData(link): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${link}`, {
            headers: this.headers,
        });
    }
}
