import { PrimeNgComponents } from "./primengComponents";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { COMPONENTS, AppRoutes } from "./app.routes";
import { DashboardComponent } from "./dashboard.component";

import { CarService } from "./demo/service/carservice";
import { CountryService } from "./demo/service/countryservice";
import { EventService } from "./demo/service/eventservice";
import { NodeService } from "./demo/service/nodeservice";
import { MenuService } from "./app.menu.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        PrimeNgComponents,
    ],
    declarations: [COMPONENTS],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CarService,
        CountryService,
        EventService,
        NodeService,
        MenuService,
    ],
    bootstrap: [DashboardComponent],
})
export class DashboardModule {}
