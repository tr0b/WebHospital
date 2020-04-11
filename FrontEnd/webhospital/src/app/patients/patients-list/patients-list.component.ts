import { Component, OnInit, OnDestroy } from "@angular/core";
import { Patient } from "../../models/patient.model";
import { Subscription } from "rxjs/Subscription";
import { PatientsService } from "../patients.service";

import { NgForm } from "@angular/forms";
@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.css"]
})
export class PatientsListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  patientId: string;
  private patientSub: Subscription;
  constructor(public patientsService: PatientsService) {}

  ngOnInit() {
    this.patientsService.getPatients();
    this.patientSub = this.patientsService
      .getPatientUpdateListener()
      .subscribe((patients: Patient[]) => {
        this.patients = patients;
      });
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
  }

  ngOnDestroy() {
    this.patientSub.unsubscribe();
  }
  setCurrentPatientId(id: string) {
    this.patientsService.changePatientId(id);
  }
}
