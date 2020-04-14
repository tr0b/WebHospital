import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Plant } from "../models/plant.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class PlantsService {
  //Plant List
  private plants: Plant[] = [];
  //Updated Plant List after POST
  private plantsUpdated = new Subject<Plant[]>();
  plantIdSource = new BehaviorSubject("-");
  currentPlantId = this.plantIdSource.asObservable();
  //Constructor with HttpClient
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  //URL string

  //Obtain all Plants
  getPlants() {
    return this.httpClient
      .get<Plant[]>(environment.API_PATH + "plants")
      .subscribe(plantData => {
        this.plants = plantData;
        this.plantsUpdated.next([...this.plants]);
      });
  }

  //Obtain a Plant
  getPlant(id: string) {
    return this.httpClient.get(environment.API_PATH + "plant/" + id);
  }
  //Update Plant
  patchPlant(plant: any, id) {
    console.log(plant);
    this.httpClient
      .patch(environment.API_PATH + "plant/" + id, plant)
      .subscribe(responseData => {
        console.log(responseData);
        this.plantsUpdated.next([...this.plants]);
        this.toastr.success("¡Planta Actualizada Exitosamente!", "¡Exito!");
        this.router.navigate(["/plants"]);
      });
  }
  getPlantUpdateListener() {
    return this.plantsUpdated.asObservable();
  }
  //Add Plants
  addPlant(plant: Plant) {
    this.httpClient
      .post(environment.API_PATH + "plant", plant)
      .subscribe(responseData => {
        console.log(responseData);
        this.plants.push(plant);
        this.plantsUpdated.next([...this.plants]);
        this.toastr.success("¡Planta Ingresada Exitosamente!", "¡Exito!");
        console.log("La notificacion se disparo");
      });
  }
  //"Removes" Plant
  removePlant(id: any) {
    const removePlantTrigger = { isActive: false };
    this.httpClient
      .patch(environment.API_PATH + "plant/" + id, removePlantTrigger)
      .subscribe(responseData => {
        console.log(responseData);
        this.plantsUpdated.next([...this.plants]);
        this.toastr.success("¡Planta Eliminada Exitosamente!", "¡Exito!");
        this.router.navigate(["/plants"]);
      });
  }
  changePlantId(id: string) {
    this.plantIdSource.next(id);
  }
}
