import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Doctor } from "../../models/doctor.model";
import { DoctorsService } from "./../doctors.service";
//Front End - Create Doctors .ts
@Component({
  selector: "app-doctors-create",
  templateUrl: "./doctors-create.component.html",
  styleUrls: ["./doctors-create.component.css"]
})
export class DoctorCreateComponent implements OnInit {
  constructor(public doctorsService: DoctorsService) {}

  onAddDoctor(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const doctor: Doctor = {
      name: form.value.name,
      last_name: form.value.last_name,
      idCard: form.value.idCard,
      isActive: form.value.isActive,
      birthDate: form.value.birthDate,
      gender: form.value.gender,
      specialty: form.value.specialty,
      email: form.value.email,
      address: form.value.address
    };
    this.doctorsService.addDoctor(doctor);
  }
  ngOnInit() {}
}
