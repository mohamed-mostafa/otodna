import { SuccessfullyRegisteredComponent } from "./successfully-registered/successfully-registered.component";
import { RegisterComponent } from "./register/register.component";
import { PathResolveService } from "./not-found/path-resolve.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    {
        path: "successfullyRegistered",
        component: SuccessfullyRegisteredComponent,
    },
    {
        path: "dashboard",
        loadChildren: () =>
            import("./Dashboard/app.module").then((m) => m.DashboardModule),
    },
    {
        path: "**",
        resolve: { path: PathResolveService },
        component: NotFoundComponent,
    },
];

export const BasicComponents = [
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    SuccessfullyRegisteredComponent,
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            scrollPositionRestoration: "enabled",
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
