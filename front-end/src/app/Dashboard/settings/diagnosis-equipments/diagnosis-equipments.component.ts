import { DocumentsService } from "./../../services/documents.service";
import { EquipmentsService } from "./../../services/equipments.service";
import { DiagnosisEquipment } from "./diagnosisEquipment";
import { MenuItem } from "primeng/primeng";
import { ShowMessageComponent } from "./../../shared/show-message/show-message.component";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from "primeng/api";
import { Component, OnInit, NgZone } from "@angular/core";

@Component({
    selector: "app-diagnosis-equipments",
    templateUrl: "./diagnosis-equipments.component.html",
    styleUrls: ["./diagnosis-equipments.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class DiagnosisEquipmentsComponent implements OnInit {
    showMessageComponent: ShowMessageComponent = new ShowMessageComponent(
        this.messageService
    );
    items: MenuItem[];
    home: MenuItem;
    equipments: any[];
    diagnosisEquipment: DiagnosisEquipment = new DiagnosisEquipment();
    displayEquipmentDialog: boolean;
    loggedInUser;
    allTests = [];
    selectedTest;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private equipmentsService: EquipmentsService,
        private documentService: DocumentsService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.items = [
            { label: "Settings" },
            {
                label: "Equipments",
            },
        ];
        this.home = { icon: "fa fa-cogs" };
        this.loggedInUser = JSON.parse(localStorage.getItem("user"));
        this.getAllTests();
        this.getAllEquipments();
    }
    getAllEquipments() {
        this.spinner.show();
        this.equipmentsService
            .getAllDiagnosisEquipments()
            .subscribe((result) => {
                this.equipments = result;
                this.spinner.hide();
            });
    }
    openEquipmentDialog() {
        this.displayEquipmentDialog = true;
    }
    save() {
        this.validateEquipment((callback) => {
            if (callback === "valid") {
                this.spinner.show();
                this.diagnosisEquipment.testId = this.selectedTest.testId;
                this.equipmentsService
                    .createDiagnosisEquipments(this.diagnosisEquipment)
                    .subscribe((u) => {
                        this.reset();
                        this.getAllEquipments();
                        this.displayEquipmentDialog = false;
                        this.spinner.hide();
                        this.showMessageComponent.showMessage(
                            "success",
                            "Saved",
                            "Data saved successfully"
                        );
                    });
            } else {
                this.showMessageComponent.showMessage(
                    "warn",
                    "Error",
                    "Please try again"
                );
            }
        });
    }
    reset() {
        this.diagnosisEquipment = new DiagnosisEquipment();
        this.selectedTest = "";
    }
    validateEquipment(callback) {
        if (!this.diagnosisEquipment.equipmentName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Equipment name is required"
            );
            return false;
        }
        if (!this.diagnosisEquipment.manufacturerName) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Manufacturer name is required"
            );
            return false;
        }
        if (!this.diagnosisEquipment.serialNumber) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Serial Number is required"
            );
            return false;
        }
        if (!this.selectedTest) {
            this.showMessageComponent.showMessage(
                "error",
                "Validation Error",
                "Test is required"
            );
            return false;
        } else {
            callback("valid");
        }
    }
    deleteEquipment(selected) {
        this.confirmationService.confirm({
            message: "Do you want to delete this equipment?",
            header: "Delete Equipment Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.spinner.show();
                this.equipmentsService
                    .deleteDiagnosisEquipment(selected.id)
                    .subscribe(() => {
                        this.spinner.hide();
                        this.getAllEquipments();
                    });
                this.showMessageComponent.showMessage(
                    "success",
                    "Confirmed",
                    "Equipment has been deleted"
                );
            },
        });
    }
    getTestById(id) {
        if (this.allTests && this.allTests.length > 0) {
            for (const element of this.allTests) {
                if (element.testId === id) {
                    return element.testName;
                }
            }
        }
    }
    getAllTests() {
        this.spinner.show();
        this.documentService
            .getAllTests("diagnosisTests")
            .then((result) => {
                this.allTests = result;
                this.spinner.hide();
            })
            .catch((error) => {
                this.showMessageComponent.showMessage(
                    "error",
                    "Error",
                    "Something went error,Please try again"
                );
                this.spinner.hide();
            });
    }
}
