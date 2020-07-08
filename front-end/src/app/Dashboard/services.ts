import { ProblemsService } from "./patients/services/problems.service";
import { MedicationsService } from "./patients/services/medications.service";
import { LabResultsService } from "./patients/services/lab-results.service";
import { ImmunizationsService } from "./patients/services/immunizations.service";
import { AllergiesService } from "./patients/services/allergies.service";
import { VitalService } from "./patients/services/vital.service";
import { FamilyService } from "./patients/services/family.service";
import { PatientService } from "./patients/services/patient.service";
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
import { AddDiagnosisService } from "./diagnosis/services/add-diagnosis.service";

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
    PatientService,
    FamilyService,
    VitalService,
    AllergiesService,
    ImmunizationsService,
    LabResultsService,
    MedicationsService,
    ProblemsService,
    AddDiagnosisService,
];
