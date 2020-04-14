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
import { Plant } from "../../models/plant.model";
import { PlantsService } from "../../plants/plant.service";
import { Subscription } from "rxjs";

//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-visit",
  templateUrl: "./visit-detail.component.html",
  styleUrls: ["./visit-detail.component.css"]
})
export class VisitDetailComponent implements OnInit {
  visit: any;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectedPatient: string;
  selectedDoctor: string;
  selectedPlant: string;
  plants: Plant[];
  doctors: Doctor[];
  patients: Patient[];
  plantSub: Subscription;
  doctorSub: Subscription;
  patientSub: Subscription;
  selectVisit: string;
  id: string;
  patientId: string;
  patient: any;
  constructor(
    private router: ActivatedRoute,
    private visitsService: VisitsService,
    public patientsService: PatientsService,
    public doctorsService: DoctorsService,
    public plantsService: PlantsService,
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
    this.patientsService.getPatients();
    this.patientSub = this.patientsService
      .getPatientUpdateListener()
      .subscribe((patients: Patient[]) => {
        this.patients = patients;
      });
    this.plantsService.getPlants();
    this.plantSub = this.plantsService
      .getPlantUpdateListener()
      .subscribe((plants: Plant[]) => {
        this.plants = plants;
      });
    this.doctorsService.getDoctors();
    this.doctorSub = this.doctorsService
      .getDoctorUpdateListener()
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
      });
  }

  getVisit(id: string) {
    this.visitsService.getVisit(id).subscribe((res: any) => {
      console.log(res);
      this.visit = res;
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
      doctor: this.selectedDoctor,
      patient: this.selectedPatient,
      plant: this.selectedPlant,
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
          "Planta: " +
          this.visit.plant.name +
          "\n\n" +
          "Doctor que realizo visita medica: " +
          this.visit.doctor.name +
          " " +
          this.visit.doctor.last_name +
          "\n\n" +
          "Especialidad Doctor: " +
          this.visit.doctor.specialty +
          "\n\n" +
          "Paciente: " +
          this.visit.patient.name +
          " " +
          this.visit.patient.last_name +
          " \n\n ID: [ " +
          this.visit.patient.idCard +
          " ] " +
          "\n\n" +
          "Numero Seguro: " +
          this.visit.patient._id +
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
