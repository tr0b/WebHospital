import { Component, OnInit, OnDestroy } from "@angular/core";
import { Doctor } from "../../models/doctor.model";
import { Subscription } from "rxjs/Subscription";
import { DoctorsService } from "../doctors.service";

import { NgForm } from "@angular/forms";
@Component({
  selector: "app-doctors-list",
  templateUrl: "./doctors-list.component.html",
  styleUrls: ["./doctors-list.component.css"]
})
export class DoctorsListComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  private doctorSub: Subscription;
  constructor(public doctorsService: DoctorsService) {}

  ngOnInit() {
    this.doctorsService.getDoctors();
    this.doctorSub = this.doctorsService
      .getDoctorUpdateListener()
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
      });
  }

  ngOnDestroy() {
    this.doctorSub.unsubscribe();
  }
}
