import { PrimeNgComponents } from "./primengComponents";
import { PathResolveService } from "./not-found/path-resolve.service";
import { AppComponent } from "./app.component";
import { DashboardModule } from "./Dashboard/app.module";
import { BasicComponents, AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations: [AppComponent, BasicComponents],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        DashboardModule,
        NgxSpinnerModule,
        PrimeNgComponents,
        ReactiveFormsModule,
    ],
    providers: [PathResolveService],
    bootstrap: [AppComponent],
})
export class AppModule {}
