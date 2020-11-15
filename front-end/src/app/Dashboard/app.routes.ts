import { MedicalHistoryComponent } from "./patients/medical-history/medical-history.component";
import { SymptomsSummaryComponent } from "./patients/diagnosis/symptoms-summary/symptoms-summary.component";
import { FrequentlyUsedComponent } from "./patients/shared/frequently-used/frequently-used.component";
import { PatientSummaryComponent } from "./patients/shared/patient-summary/patient-summary.component";
import { NotificationComponent } from "./shared/notification/notification.component";
import { ReferralsComponent } from "./patients/referrals/referrals.component";
import { SearchResultItemComponent } from "./patients/shared/item-search/search-result-item/search-result-item.component";
import { ItemSearchComponent } from "./patients/shared/item-search/item-search.component";
import { RadioComponent } from "./patients/shared/parameters/radio/radio.component";
import { TextareaComponent } from "./patients/shared/parameters/textarea/textarea.component";
import { ListWithImageComponent } from "./patients/shared/parameters/list-with-image/list-with-image.component";
import { ListComponent } from "./patients/shared/parameters/list/list.component";
import { BooleanComponent } from "./patients/shared/parameters/boolean/boolean.component";
import { NumberComponent } from "./patients/shared/parameters/number/number.component";
import { StringComponent } from "./patients/shared/parameters/string/string.component";
import { EquipmentTestParametersComponent } from "./patients/shared/equipment-test-parameters/equipment-test-parameters.component";
import { GraphComponent } from "./patients/shared/graph/graph.component";
import { PatientBreadcrumbComponent } from "./patients/shared/patient-breadcrumb/patient-breadcrumb.component";
import { ShowMessageComponent } from "./shared/show-message/show-message.component";
import { TestParametersComponent } from "./patients/shared/test-parameters/test-parameters.component";
import { FilesIconsComponent } from "./patients/shared/files-icons/files-icons.component";
import { SessionDocumentsComponent } from "./patients/session-documents/session-documents.component";
import { DocumentsComponent } from "./patients/documents/documents.component";
import { TreatmentTestsComponent } from "./patients/treatments/treatment-tests/treatment-tests.component";
import { PatientSessionComponent } from "./patients/patient-session/patient-session.component";
import { SymptomsComponent } from "./patients/diagnosis/symptoms/symptoms.component";
import { AuthGuard } from "./../Auth/auth.guard";
import { TeamMembersComponent } from "./Teams/team-members/team-members.component";
import { MyTeamsComponent } from "./Teams/my-teams/my-teams.component";
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
import { TestsComponent } from "./patients/diagnosis/tests/tests.component";
import { PathologyComponent } from "./patients/diagnosis/pathology/pathology.component";
import { CandidacyComponent } from "./patients/diagnosis/candidacy/candidacy.component";

export const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "search", component: SearchPatientComponent },
            { path: "", redirectTo: "search", pathMatch: "full" },
            { path: "dashboard", component: DashboardDemoComponent },
            { path: "users", component: UsersComponent },
            { path: "myTeams", component: MyTeamsComponent },
            { path: "teamMembers", component: TeamMembersComponent },
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
            { path: "medical/family", component: FamilyComponent },
            { path: "medical/vital", component: VitalComponent },
            { path: "medical/allergies", component: AllergiesComponent },
            { path: "medical/labResults", component: LabResultsComponent },
            {
                path: "medical/immunizations",
                component: ImmunizationsComponent,
            },
            { path: "medical/medications", component: MedicationsComponent },
            { path: "medical/problems", component: ProblemsComponent },
            { path: "patientHistory", component: PatientHistoryComponent },
            { path: "addDiagnosis", component: PatientSessionComponent },
            { path: "symptoms", component: SymptomsComponent },
            { path: "diagnosisTests", component: TestsComponent },
            { path: "diagnosisPathology", component: PathologyComponent },
            { path: "diagnosisCandidacy", component: CandidacyComponent },
            { path: "addTreatment", component: PatientSessionComponent },
            { path: "treatmentTests", component: TreatmentTestsComponent },
            { path: "addFollowup", component: PatientSessionComponent },
            { path: "followupSymptoms", component: SymptomsComponent },
            { path: "followupTests", component: TestsComponent },
            {
                path: "followupPathology",
                component: PathologyComponent,
            },
            {
                path: "followupCandidacy",
                component: CandidacyComponent,
            },
            { path: "documents", component: DocumentsComponent },
            {
                path: "diagnosisDocuments",
                component: SessionDocumentsComponent,
            },
            {
                path: "treatmentsDocuments",
                component: SessionDocumentsComponent,
            },
            { path: "followupDocuments", component: SessionDocumentsComponent },
            { path: "filesIcons", component: FilesIconsComponent },
            { path: "referrals", component: ReferralsComponent },
            { path: "medicalHistory", component: MedicalHistoryComponent },
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
    TestsComponent,
    PathologyComponent,
    CandidacyComponent,
    MyTeamsComponent,
    TeamMembersComponent,
    SymptomsComponent,
    PatientSessionComponent,
    TreatmentTestsComponent,
    DocumentsComponent,
    SessionDocumentsComponent,
    FilesIconsComponent,
    TestParametersComponent,
    ShowMessageComponent,
    PatientBreadcrumbComponent,
    GraphComponent,
    EquipmentTestParametersComponent,
    StringComponent,
    NumberComponent,
    BooleanComponent,
    ListComponent,
    ListWithImageComponent,
    TextareaComponent,
    RadioComponent,
    SearchResultItemComponent,
    ItemSearchComponent,
    ReferralsComponent,
    NotificationComponent,
    PatientSummaryComponent,
    FrequentlyUsedComponent,
    SymptomsSummaryComponent,
    MedicalHistoryComponent,
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class AppRoutes {}
