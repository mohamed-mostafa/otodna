import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ParameterValueService {
    apiUrl = environment.patientApiUrl;
    link = "parametersValues";
    constructor(private http: HttpClient) {}

    createParametersValues(data): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, data);
    }
}
