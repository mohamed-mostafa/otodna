import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class EquipmentsService {
    apiUrl = environment.patientApiUrl;
    link = "diagnosis-equipments";

    constructor(private http: HttpClient) {}

    getAllDiagnosisEquipments(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.link}`);
    }
    deleteDiagnosisEquipment(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.link}/${id}`);
    }
    updateDiagnosisEquipment(equipment): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.link}/${equipment.id}`,
            equipment
        );
    }
    createDiagnosisEquipments(equipment): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.link}/`, equipment);
    }
    getEquipmentByTestId(id): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.link}?filter[where][testId][eq]=${id}`
        );
    }
}
