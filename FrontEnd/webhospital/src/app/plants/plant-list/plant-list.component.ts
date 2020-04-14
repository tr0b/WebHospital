import { Component, OnInit, OnDestroy } from "@angular/core";
import { Plant } from "../../models/plant.model";
import { Subscription } from "rxjs/Subscription";
import { PlantsService } from "../plant.service";

import { LogInService } from "../../login/login.service";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-plants-list",
  templateUrl: "./plant-list.component.html",
  styleUrls: ["./plant-list.component.css"]
})
export class PlantsListComponent implements OnInit, OnDestroy {
  //PlantsListClass class
  plants: Plant[] = [];
  plantId: string;
  private plantSub: Subscription;
  private authStatusSub: Subscription;
  public userIsAuthenticated: boolean = false;
  constructor(
    public plantsService: PlantsService,
    private logInService: LogInService
  ) {}

  ngOnInit() {
    this.plantsService.getPlants();
    this.plantSub = this.plantsService
      .getPlantUpdateListener()
      .subscribe((plants: Plant[]) => {
        this.plants = plants;
      });
    this.plantsService.currentPlantId.subscribe(
      plantId => (this.plantId = plantId)
    );
    this.userIsAuthenticated = this.logInService.getIsAuth();
    this.authStatusSub = this.logInService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.plantSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  setCurrentPlantId(id: string) {
    this.plantsService.changePlantId(id);
  }
}
