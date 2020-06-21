import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UsersService {
    apiUrl = environment.apiUrl;
    usersLink = "users";
    userTypesLink = "user-types";
    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.usersLink}`);
    }
    deleteUser(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.usersLink}/${id}`);
    }
    updateUser(user): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.usersLink}/${user.id}`,
            user
        );
    }
    getAllUsersExceptConsultants(): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.usersLink}?filter[where][role_id][neq]=2`
        );
    }
    createUser(user): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.usersLink}/`, user);
    }
    getFilteredUser(name, value): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.usersLink}?filter[where][${name}][eq]=${value}`
        );
    }
    getAllUserTypes(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.userTypesLink}`);
    }
}
