import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class NotificationsService {
    apiUrl = environment.patientApiUrl;
    link = "notifications";
    constructor(private http: HttpClient) {}

    getAllNotifications(teamId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][and][0][teamId][eq]=${teamId}&filter[where][and][1][seen][eq]=false`
        );
    }
    deleteNotification(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateNotification(notification): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${notification.id}`,
            notification
        );
    }
    createNotification(notification): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.link}`,
            notification
        );
    }
}
