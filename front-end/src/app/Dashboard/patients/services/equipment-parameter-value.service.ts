import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class EquipmentParameterValueService {
    apiUrl = environment.patientApiUrl;
    link = "equipmentParametersValues";
    parameterValueLink = "equipmentParameterValue";
    constructor(private http: HttpClient) {}

    createEquipmentParametersValues(data): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}`, data);
    }
    updateEquipmentParametersValues(data): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${this.link}`, data);
    }
    getEquipmentParametersValues(equipmentTreatmentId): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.parameterValueLink}?filter[where][equipmentTreatmentId][eq]=${equipmentTreatmentId}`
        );
    }
}
