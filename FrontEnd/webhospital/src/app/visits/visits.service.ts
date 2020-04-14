import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Visit } from "../models/visit.model";
import { Doctor } from "../models/doctor.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class VisitsService {
  //Visit List
  private visits: Visit[] = [];
  //Updated Visit List after POST
  private visitsUpdated = new Subject<Visit[]>();
  //Constructor with HttpClient
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  //URL string

  //Obtain all Visits
  getVisits(id: any) {
    return this.httpClient
      .get<Visit[]>(environment.API_PATH + "visits/" + id)
      .subscribe(visitData => {
        this.visits = visitData;
        this.visitsUpdated.next([...this.visits]);
      });
  }

  //Obtain a Visit
  getVisit(id: string) {
    return this.httpClient.get(environment.API_PATH + "visit/" + id);
  }
  //Update Visit
  patchVisit(visit: any, id) {
    console.log(visit);
    this.httpClient
      .patch(environment.API_PATH + "visit/" + id, visit)
      .subscribe(responseData => {
        console.log(responseData);
        this.visitsUpdated.next([...this.visits]);
        this.toastr.success("¡Visita Actualizada Exitosamente!", "¡Exito!");

        this.router.navigate(["/patients"]);
      });
  }
  getVisitUpdateListener() {
    return this.visitsUpdated.asObservable();
  }
  //Add Visits
  addVisit(visit: Visit) {
    this.httpClient
      .post(environment.API_PATH + "visit", visit)
      .subscribe(responseData => {
        console.log(responseData);
        this.visits.push(visit);
        this.visitsUpdated.next([...this.visits]);
        this.toastr.success("¡Visita Ingresada Exitosamente!", "¡Exito!");
        console.log("La notificacion se disparo");
        this.router.navigate(["/patients"]);
      });
  }
}
