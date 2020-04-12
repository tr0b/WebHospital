import { Component, OnInit, OnDestroy } from "@angular/core";
import { Doctor } from "../../models/doctor.model";
import { Subscription } from "rxjs/Subscription";
import { DoctorsService } from "../doctors.service";

import { LogInService } from "../../login/login.service";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-doctors-list",
  templateUrl: "./doctors-list.component.html",
  styleUrls: ["./doctors-list.component.css"]
})
export class DoctorsListComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  doctorId: string;
  private doctorSub: Subscription;
  private authStatusSub: Subscription;
  public userIsAuthenticated: boolean = false;
  constructor(
    public doctorsService: DoctorsService,
    private logInService: LogInService
  ) {}

  ngOnInit() {
    this.doctorsService.getDoctors();
    this.doctorSub = this.doctorsService
      .getDoctorUpdateListener()
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
      });
    this.doctorsService.currentDoctorId.subscribe(
      doctorId => (this.doctorId = doctorId)
    );
    this.userIsAuthenticated = this.logInService.getIsAuth();
    this.authStatusSub = this.logInService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.doctorSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  setCurrentDoctorId(id: string) {
    this.doctorsService.changeDoctorId(id);
  }
}
