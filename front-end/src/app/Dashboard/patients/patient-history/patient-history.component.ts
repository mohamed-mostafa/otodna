import { HistoryService } from "./../services/historyService";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-patient-history",
    templateUrl: "./patient-history.component.html",
    styleUrls: ["./patient-history.component.css"],
})
export class PatientHistoryComponent implements OnInit {
    items: MenuItem[];
    home: MenuItem;
    events: any[];
    fullcalendarOptions: any;
    constructor(
        private router: Router,
        private historyService: HistoryService
    ) {}

    ngOnInit(): void {
        let patientType = localStorage.getItem("patientType");
        if (patientType === "create") {
            this.items = [{ label: "Patients" }, { label: "Create Patient" }];
        } else {
            let selectedPatient = JSON.parse(
                localStorage.getItem("selectedPatient")
            );
            this.items = [
                { label: "Patients" },
                { label: selectedPatient.username },
            ];
        }
        this.home = { icon: "fa fa-user-md" };
        this.historyService.getHistory().then((events) => {
            this.events = events;
        });
        this.fullcalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: new Date(),
            header: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
        };
    }
    addDiagnosis() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addDiagnosis"]);
            });
    }
    addTreatment() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addTreatment"]);
            });
    }
    addFollowup() {
        this.router
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
                this.router.navigate(["/dashboard/addFollowup"]);
            });
    }
}
