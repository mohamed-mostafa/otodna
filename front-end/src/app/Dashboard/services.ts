import { UsersService } from "./services/users.service";
import { TeamsService } from "./services/teams.service";
import { PatientCountryService } from "./patients/services/countryService";
import { HistoryService } from "./patients/services/historyService";
import { CarService } from "./demo/service/carservice";
import { CountryService } from "./demo/service/countryservice";
import { EventService } from "./demo/service/eventservice";
import { NodeService } from "./demo/service/nodeservice";
import { MenuService } from "./app.menu.service";
import { TeamsService as demoTeamService } from "./demo/service/teamService";
import { DepartmentsService } from "./services/departments.service";
import { RolesService } from "./services/roles.service";

export const SERVICES = [
    CarService,
    CountryService,
    EventService,
    NodeService,
    MenuService,
    demoTeamService,
    HistoryService,
    PatientCountryService,
    DepartmentsService,
    RolesService,
    TeamsService,
    UsersService,
];
