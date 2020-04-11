import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Visit } from "../../models/visit.model";
import { VisitsService } from "./../visits.service";
import { PatientsService } from "../../patients/patients.service";
//Front End - Create Visits .ts
@Component({
  selector: "app-visits-create",
  templateUrl: "./visits-create.component.html",
  styleUrls: ["./visits-create.component.css"]
})
export class VisitCreateComponent implements OnInit {
  patientId: string;
  constructor(
    public visitsService: VisitsService,
    public patientsService: PatientsService
  ) {}

  onAddVisit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const visit: Visit = {
      doctor: form.value.doctor,
      patient: this.patientId,
      plant: form.value.plant,
      description: form.value.description
    };
    this.visitsService.addVisit(visit);
  }
  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
  }
}
