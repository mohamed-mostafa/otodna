import { SERVICES } from "./services";
import { NgxSpinnerModule } from "ngx-spinner";
import { PrimeNgComponents } from "./primengComponents";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { COMPONENTS, AppRoutes } from "./app.routes";
import { DashboardComponent } from "./dashboard.component";
import { JwtInterceptor } from "../Auth/jwt.interceptor";
import { ErrorInterceptor } from "../Auth/error.interceptor";
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutes,
        HttpClientModule,
        PrimeNgComponents,
        NgxSpinnerModule,
    ],
    declarations: [COMPONENTS],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        SERVICES,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [DashboardComponent],
})
export class DashboardModule {}
