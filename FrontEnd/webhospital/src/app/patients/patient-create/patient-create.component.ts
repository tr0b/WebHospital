import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Patient } from "../../models/patient.model";
import { PatientsService } from "./../patients.service";
//Front End - Create Patients .ts
@Component({
  selector: "app-patient-create",
  templateUrl: "./patient-create.component.html",
  styleUrls: ["./patient-create.component.css"]
})
export class PatientCreateComponent implements OnInit {
  bloods: String[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  genders: String[] = ["Male", "Female"];
  maritalStatuses: String[] = ["Married", "Divorced", "Single", "Widowed"];
  constructor(public patientsService: PatientsService) {}

  onAddPatient(form: NgForm) {
    /* if (form.invalid) {
     *   return;
     * } */
    const patient: Patient = {
      name: form.value.name,
      last_name: form.value.last_name,
      birthDate: form.value.birthDate,
      idCard: form.value.idCard,
      bloodType: form.value.blood,
      gender: form.value.gender,
      isActive: form.value.isActive,
      maritalStatus: form.value.maritalStatus,
      phone: form.value.phone,
      email: form.value.email
    };
    this.patientsService.addPatient(patient);
  }
  ngOnInit() {}
}
