import { AppFooterComponent } from "./app.footer.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { AppMenuComponent } from "./app.menu.component";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders, NgModule } from "@angular/core";
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
import { SearchPatientComponent } from "./search-patient/search-patient.component";
import { NewPatientComponent } from "./new-patient/new-patient.component";
import { UsersComponent } from "./users/users.component";

export const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            { path: "", component: SearchPatientComponent },
            { path: "dashboard", component: DashboardDemoComponent },
            { path: "patient", component: NewPatientComponent },
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
    NewPatientComponent,
    UsersComponent,
];
@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
export class AppRoutes {}