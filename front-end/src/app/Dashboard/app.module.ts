import { SERVICES } from "./services";
import { NgxSpinnerModule } from "ngx-spinner";
import { PrimeNgComponents } from "./primengComponents";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { COMPONENTS, AppRoutes } from "./app.routes";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        PrimeNgComponents,
        NgxSpinnerModule,
    ],
    declarations: [COMPONENTS],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        SERVICES,
    ],
    bootstrap: [DashboardComponent],
})
export class DashboardModule {}
