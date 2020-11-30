import { PatientService } from "./../services/patient.service";
import { SharedClass } from "./../shared/sharedFunctions";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
import { Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit } from "@angular/core";
@Component({
    selector: "app-medical-history",
    templateUrl: "./medical-history.component.html",
    styleUrls: ["./medical-history.component.css"],
})
export class MedicalHistoryComponent implements OnInit {
    sharedClass: SharedClass = new SharedClass(this.patientService);
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    selectedPatient;
    showAllButtons = true;
    cogsItems = [];
    constructor(
        private messageService: MessageService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private patientService: PatientService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit(): void {
        this.selectedPatient = JSON.parse(
            localStorage.getItem("selectedPatient")
        );
        this.checkLoggedInUserTeamWithPatient();
    }
    async checkLoggedInUserTeamWithPatient() {
        const LoggedInUser = JSON.parse(localStorage.getItem("user"));
        this.showAllButtons = await this.sharedClass.checkLoggedInUserTeamWithPatient(
            LoggedInUser,
            this.selectedPatient
        );
    }
}
