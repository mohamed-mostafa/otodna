import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DashboardComponent } from "./dashboard.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppMenuComponent } from "./app.menu.component";
import { AppFooterComponent } from "./app.footer.component";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { MenuService } from "./app.menu.service";

describe("DashboardComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ScrollPanelModule, RouterTestingModule],
            declarations: [
                AppTopBarComponent,
                AppMenuComponent,
                AppFooterComponent,
                DashboardComponent,
            ],
            providers: [MenuService],
        }).compileComponents();
    }));

    it("should create the app", async(() => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
