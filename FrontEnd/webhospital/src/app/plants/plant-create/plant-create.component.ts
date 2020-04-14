import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Plant } from "../../models/plant.model";
import { PlantsService } from "../plant.service";
//Front End - Create Plants .ts
@Component({
  selector: "app-plant-create",
  templateUrl: "./plant-create.component.html",
  styleUrls: ["./plant-create.component.css"]
})
export class PlantCreateComponent implements OnInit {
  constructor(public plantsService: PlantsService) {}

  onAddPlant(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const plant: Plant = {
      name: form.value.name
    };
    this.plantsService.addPlant(plant);
  }
  ngOnInit() {}
}
