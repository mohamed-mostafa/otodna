import { User } from "./user";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    login(user: User): Observable<any> {
        return this.http.post<User>(`${this.apiUrl}/users/login`, user);
    }
    register(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/users/signup`, user);
    }
    getAllRoles(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/roles`);
    }
}
