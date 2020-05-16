import { PathResolveService } from './not-found/path-resolve.service';
import { AppComponent } from "./app.component";
import { DashboardModule } from "./Dashboard/app.module";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        DashboardModule,
        NgxSpinnerModule,
    ],
    providers: [PathResolveService],
    bootstrap: [AppComponent],
})
export class AppModule {}
