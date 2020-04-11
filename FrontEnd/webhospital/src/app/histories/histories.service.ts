import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { History } from "../models/history.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: "root" })
export class HistoriesService {
  //History List
  private histories: History[] = [];
  //Updated History List after POST
  private historiesUpdated = new Subject<History[]>();
  //Constructor with HttpClient
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  //URL string

  //Obtain all Histories
  getHistories(id: any) {
    return this.httpClient
      .get<History[]>(environment.API_PATH + "histories/" + id)
      .subscribe(historyData => {
        this.histories = historyData;
        this.historiesUpdated.next([...this.histories]);
      });
  }

  //Obtain a History
  getHistory(id: string) {
    return this.httpClient.get(environment.API_PATH + "history/" + id);
  }
  //Update History
  patchHistory(history: any, id) {
    console.log(history);
    this.httpClient
      .patch(environment.API_PATH + "history/" + id, history)
      .subscribe(responseData => {
        console.log(responseData);
        this.historiesUpdated.next([...this.histories]);
        this.toastr.success("¡Historia Actualizado Exitosamente!", "¡Exito!");
      });
  }
  getHistoryUpdateListener() {
    return this.historiesUpdated.asObservable();
  }
  //Add Histories
  addHistory(history: History) {
    this.httpClient
      .post(environment.API_PATH + "history", history)
      .subscribe(responseData => {
        console.log(responseData);
        this.histories.push(history);
        this.historiesUpdated.next([...this.histories]);
        this.toastr.success("¡Historia Ingresado Exitosamente!", "¡Exito!");
        console.log("La notificacion se disparo");
      });
  }
}
