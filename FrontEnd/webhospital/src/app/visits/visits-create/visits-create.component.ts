import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Visit } from "../../models/visit.model";
import { VisitsService } from "./../visits.service";
//Front End - Create Visits .ts
@Component({
  selector: "app-visits-create",
  templateUrl: "./visits-create.component.html",
  styleUrls: ["./visits-create.component.css"]
})
export class VisitCreateComponent implements OnInit {
  constructor(public visitsService: VisitsService) {}

  onAddVisit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const visit: Visit = {
      doctor: form.value.doctor,
      patient: form.value.patient,
      plant: form.value.plant,
      description: form.value.description,
      medicines: form.value.medicines
    };
    this.visitsService.addVisit(visit);
  }
  ngOnInit() {}
}
