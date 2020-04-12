import { Component, OnInit, OnDestroy } from "@angular/core";
import { Patient } from "../../models/patient.model";
import { Subscription } from "rxjs/Subscription";
import { PatientsService } from "../patients.service";

import { LogInService } from "../../login/login.service";
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
  private authStatusSub: Subscription;
  public userIsAuthenticated: boolean = false;
  constructor(
    public patientsService: PatientsService,
    private logInService: LogInService
  ) {}

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
    this.userIsAuthenticated = this.logInService.getIsAuth();
    this.authStatusSub = this.logInService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.patientSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  setCurrentPatientId(id: string) {
    this.patientsService.changePatientId(id);
  }
}
