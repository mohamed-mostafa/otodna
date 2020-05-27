import { AddFollowupComponent } from "./followup/add-followup/add-followup.component";
import { AddTreatmentComponent } from "./treatment/add-treatment/add-treatment.component";
import { AddDiagnosisComponent } from "./diagnosis/add-diagnosis/add-diagnosis.component";
import { PatientHistoryComponent } from "./patients/patient-history/patient-history.component";
import { ProblemsComponent } from "./patients/problems/problems.component";
import { MedicationsComponent } from "./patients/medications/medications.component";
import { ImmunizationsComponent } from "./patients/immunizations/immunizations.component";
import { LabResultsComponent } from "./patients/lab-results/lab-results.component";
import { AllergiesComponent } from "./patients/allergies/allergies.component";
import { VitalComponent } from "./patients/vital/vital.component";
import { FamilyComponent } from "./patients/family/family.component";
import { PatientBasicInfoComponent } from "./patients/patient-basic-info/patient-basic-info.component";
import { AppFooterComponent } from "./app.footer.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { AppMenuComponent } from "./app.menu.component";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";
import { SampleDemoComponent } from "./demo/view/sampledemo.component";
import { FormsDemoComponent } from "./demo/view/formsdemo.component";
import { DataDemoComponent } from "./demo/view/datademo.component";
import { PanelsDemoComponent } from "./demo/view/panelsdemo.component";
import { OverlaysDemoComponent } from "./demo/view/overlaysdemo.component";
import { MenusDemoComponent } from "./demo/view/menusdemo.component";
import { MessagesDemoComponent } from "./demo/view/messagesdemo.component";
import { MiscDemoComponent } from "./demo/view/miscdemo.component";
import { EmptyDemoComponent } from "./demo/view/emptydemo.component";
import { ChartsDemoComponent } from "./demo/view/chartsdemo.component";
import { FileDemoComponent } from "./demo/view/filedemo.component";
import { DocumentationComponent } from "./demo/view/documentation.component";
import { SearchPatientComponent } from "./patients/search-patient/search-patient.component";
import { UsersComponent } from "./users/users.component";

export const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            { path: "", component: SearchPatientComponent },
            { path: "dashboard", component: DashboardDemoComponent },
            { path: "users", component: UsersComponent },
            { path: "sample", component: SampleDemoComponent },
            { path: "forms", component: FormsDemoComponent },
            { path: "data", component: DataDemoComponent },
            { path: "panels", component: PanelsDemoComponent },
            { path: "overlays", component: OverlaysDemoComponent },
            { path: "menus", component: MenusDemoComponent },
            { path: "messages", component: MessagesDemoComponent },
            { path: "misc", component: MiscDemoComponent },
            { path: "pages/empty", component: EmptyDemoComponent },
            { path: "charts", component: ChartsDemoComponent },
            { path: "file", component: FileDemoComponent },
            { path: "documentation", component: DocumentationComponent },
            { path: "patient", component: PatientBasicInfoComponent },
            { path: "editPatient", redirectTo: "patient", pathMatch: "full" },
            { path: "family", component: FamilyComponent },
            { path: "vital", component: VitalComponent },
            { path: "allergies", component: AllergiesComponent },
            { path: "labResults", component: LabResultsComponent },
            { path: "immunizations", component: ImmunizationsComponent },
            { path: "medications", component: MedicationsComponent },
            { path: "problems", component: ProblemsComponent },
            { path: "patientHistory", component: PatientHistoryComponent },
            { path: "addDiagnosis", component: AddDiagnosisComponent },
            { path: "addTreatment", component: AddTreatmentComponent },
            { path: "addFollowup", component: AddFollowupComponent },
        ],
    },
];

export const COMPONENTS = [
    DashboardComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    DashboardDemoComponent,
    SampleDemoComponent,
    FormsDemoComponent,
    DataDemoComponent,
    PanelsDemoComponent,
    OverlaysDemoComponent,
    MenusDemoComponent,
    MessagesDemoComponent,
    MessagesDemoComponent,
    MiscDemoComponent,
    ChartsDemoComponent,
    EmptyDemoComponent,
    FileDemoComponent,
    DocumentationComponent,
    SearchPatientComponent,
    UsersComponent,
    PatientBasicInfoComponent,
    FamilyComponent,
    VitalComponent,
    AllergiesComponent,
    LabResultsComponent,
    ImmunizationsComponent,
    MedicationsComponent,
    ProblemsComponent,
    PatientHistoryComponent,
    AddDiagnosisComponent,
    AddTreatmentComponent,
    AddFollowupComponent,
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class AppRoutes {}
