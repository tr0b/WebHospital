import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { History } from "../../models/history.model";
import { HistoriesService } from "./../histories.service";
import { PatientsService } from "../../patients/patients.service";
//Front End - Create Histories .ts
@Component({
  selector: "app-histories-create",
  templateUrl: "./histories-create.component.html",
  styleUrls: ["./histories-create.component.css"]
})
export class HistoryCreateComponent implements OnInit {
  patientId: string;
  constructor(
    public historiesService: HistoriesService,
    public patientsService: PatientsService
  ) {}

  onAddHistory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const history: History = {
      patient: this.patientId,
      room: form.value.room,
      dateIn: form.value.dateIn,
      dateOut: form.value.dateOut,
      bedId: form.value.bedId
    };
    this.historiesService.addHistory(history);
  }
  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
  }
}
