import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VisitsService } from "../visits.service";
import { Visit } from "../../models/visit.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Patient } from "../../models/patient.model";

//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-visit",
  templateUrl: "./visit-detail.component.html",
  styleUrls: ["./visit-detail.component.css"]
})
export class VisitDetailComponent implements OnInit {
  visit: Visit;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectVisit: string;
  id: string;
  private patient: Patient;

  constructor(
    private router: ActivatedRoute,
    private visitsService: VisitsService,
    private toastr: ToastrService
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];
      this.getVisit(this.id);
    });
  }

  ngOnInit() {}

  getVisit(id: string) {
    this.visitsService.getVisit(id).subscribe((data: Visit) => {
      this.visit = data;
      console.log(this.visit);
    });
  }

  //Visit gets updated with PATCH method
  patchVisit() {
    this.edit = !this.edit;
  }

  onPatchVisit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const freshvisit: Visit = {
      date: form.value.date,
      doctor: form.value.doctor,
      patient: form.value.patient,
      plant: form.value.plant,
      description: form.value.description
    };

    console.log("Imprimiendo formulario...");
    console.log(freshvisit);
    console.log("Formulario impreso");
    this.visitsService.patchVisit(freshvisit, this.id);
  }
}
