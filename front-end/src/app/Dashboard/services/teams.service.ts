import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TeamsService {
    apiUrl = environment.userApiUrl;
    teamsLink = "teams";
    membersLink = "members";
    memberLink = "member";
    teamMembersLink = "team-members";
    constructor(private http: HttpClient) {}

    getAllTeams(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.teamsLink}`);
    }
    getTeamById(id: String): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${this.teamsLink}/${id}`);
    }
    deleteTeam(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.teamsLink}/${id}`);
    }
    updateTeam(team): Observable<void> {
        return this.http.patch<void>(
            `${this.apiUrl}/${this.teamsLink}/${team.id}`,
            team
        );
    }
    createTeam(team): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${this.teamsLink}/`, team);
    }
    getFilteredTeam(name, value): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${this.teamsLink}?filter[where][${name}][eq]=${value}&filter[include][][relation]=department`
        );
    }
    getTeamMembers(id) {
        return this.http.get<any>(
            `${this.apiUrl}/${this.teamsLink}/${id}/${this.membersLink}`
        );
    }
    createTeamMember(id, data): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${this.teamsLink}/${id}/${this.memberLink}`,
            data
        );
    }
    deleteTeamMember(teamId, userId): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${this.memberLink}/${teamId}/${userId}`
        );
    }
    getTeamMembersByTeamId(teamId) {
        return this.http.get<any>(
            `${this.apiUrl}/${this.teamsLink}/${teamId}/${this.teamMembersLink}`
        );
    }
}
