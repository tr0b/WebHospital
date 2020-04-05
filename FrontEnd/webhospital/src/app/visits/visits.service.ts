import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Visit } from "../models/visit.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class VisitsService {
  //Visit List
  private visits: Visit[] = [];
  //Updated Visit List after POST
  private visitsUpdated = new Subject<Visit[]>();
  //Constructor with HttpClient
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  //URL string
  private url: String = "http://localhost:3000/api/v1/";

  //Obtain all Visits
  getVisits() {
    return this.httpClient
      .get<Visit[]>(this.url + "visits")
      .subscribe(visitData => {
        this.visits = visitData;
        this.visitsUpdated.next([...this.visits]);
      });
  }
  getVisitUpdateListener() {
    return this.visitsUpdated.asObservable();
  }

  //Obtain all Visits of specific Patient
  getPatientVisits() {
    return this.httpClient
      .get<Visit[]>(this.url + "visits/" + "")
      .subscribe(visitData => {
        this.visits = visitData;
        this.visitsUpdated.next([...this.visits]);
      });
  }
  //Add Visits
  addVisit(visit: Visit) {
    this.httpClient.post(this.url + "visit", visit).subscribe(responseData => {
      console.log(responseData);
      this.visits.push(visit);
      this.visitsUpdated.next([...this.visits]);
      this.toastr.success("¡Paciente Ingresado Exitosamente!", "¡Exito!");
      console.log("La notificacion se disparo");
    });
  }
}
