import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VisitsService } from "../visits.service";
import { Visit } from "../../models/visit.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Patient } from "../../models/patient.model";
import { PatientsService } from "../../patients/patients.service";
import { PdfMakeWrapper, Txt, Table, Cell } from "pdfmake-wrapper";
import { Doctor } from "../../models/doctor.model";
import { DoctorsService } from "../../doctors/doctors.service";

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
  patientId: string;
  patient: any;
  private doctor: Doctor;

  constructor(
    private router: ActivatedRoute,
    private visitsService: VisitsService,
    public patientsService: PatientsService,
    public doctorsService: DoctorsService,
    private toastr: ToastrService
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];
      this.getVisit(this.id);
    });
  }

  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
    this.patientsService
      .getPatient(this.patientId)
      .subscribe(patient => (this.patient = patient));
  }

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
  //Generating a Report of the Visit
  generatePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({ bold: false, fontSize: 12 });
    pdf.add(
      new Txt(
        "*******REPORTE DE VISITA MEDICA A PACIENTE *******" +
          "\n\n" +
          "Visita: " +
          this.id +
          "\n\n" +
          "Fecha: " +
          this.visit.date +
          " \n\n" +
          "Paciente: " +
          this.patient.name +
          " " +
          this.patient.last_name +
          " \n\n ID: [ " +
          this.patient.idCard +
          " ] " +
          "\n\n" +
          "Numero Seguro: " +
          this.patient._id +
          "\n\n" +
          "Diagnostico: " +
          this.visit.description +
          " \n\n" +
          "*******REPORTE DE VISITA MEDICA A PACIENTE *******"
      ).end
      /* new Txt("Fecha: " + this.visit.date).end,
       * new Txt("Diagnostico: " + this.visit.description).end,
       * new Txt(
       *   "Doctor " +
       *     this.doctor.name +
       *     " " +
       *     this.doctor.last_name +
       *     " ID:[" +
       *     this.doctor.idCard +
       *     " ]"
       * ) */
    );
    pdf.create().open();
  }
}
