import { CarService } from "./../demo/service/carservice";
import { Car } from "./../demo/domain/car";
import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";

@Component({
    selector: "app-search-patient",
    templateUrl: "./search-patient.component.html",
    styleUrls: ["./search-patient.component.css"],
})
export class SearchPatientComponent implements OnInit {
    teamsDropdownList: SelectItem[];
    show = false;
    cols: any[];
    cars1: Car[];
    selectedCar: Car;
    colors: SelectItem[];
    brands: SelectItem[];

    constructor(private carService: CarService) {}

    ngOnInit(): void {
        this.carService.getCarsMedium().then((cars) => (this.cars1 = cars));
        this.teamsDropdownList = [
            { label: "Ahmed Mohamed", value: "ahmedMohamed" },
            { label: "Mariem Mohamed", value: "mariemMohamed" },
            { label: "ibrahim Mahmoud", value: "ibrahimMohamoud" },
            { label: "Aya zaki", value: "ayaZaki" },
            { label: "Eslam ahmed", value: "eslamAhmed" },
            { label: "Mostafa ashref", value: "mostafaAshref" },
            { label: "Hend Mahmoud", value: "hendMahmoud" },
            { label: "Tamer Mahmoud", value: "tamerMahmoumd" },
            { label: "Nada ahmed", value: "nadaAhmed" },
            { label: "Salah Abdallah", value: "salahAbdallah" },
        ];
        this.cols = [
            { field: "vin", header: "Vin" },
            { field: "year", header: "Year" },
            { field: "brand", header: "Brand" },
            { field: "color", header: "Color" },
        ];
        this.colors = [
            { label: "White", value: "White" },
            { label: "Green", value: "Green" },
            { label: "Silver", value: "Silver" },
            { label: "Black", value: "Black" },
            { label: "Red", value: "Red" },
            { label: "Maroon", value: "Maroon" },
            { label: "Brown", value: "Brown" },
            { label: "Orange", value: "Orange" },
            { label: "Blue", value: "Blue" },
        ];
        this.brands = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'Volkswagen', value: 'Volkswagen' },
            { label: 'Volvo', value: 'Volvo' }
        ];
    }
    showAdvancedSearch() {
        this.show = !this.show;
    }
}
