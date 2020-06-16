import { PublicServiceService } from "./public-service.service";
import { PatientCountryService } from "./patients/services/countryService";
import { HistoryService } from "./patients/services/historyService";
import { CarService } from "./demo/service/carservice";
import { CountryService } from "./demo/service/countryservice";
import { EventService } from "./demo/service/eventservice";
import { NodeService } from "./demo/service/nodeservice";
import { MenuService } from "./app.menu.service";
import { TeamsService } from "./demo/service/teamService";

export const SERVICES = [
    CarService,
    CountryService,
    EventService,
    NodeService,
    MenuService,
    TeamsService,
    HistoryService,
    PatientCountryService,
    PublicServiceService,
];
