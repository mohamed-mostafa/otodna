import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TeamsService {
    constructor(private http: HttpClient) {}

    getTeams() {
        return this.http
            .get<any>("assets/demo/data/teams.json")
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }
}
