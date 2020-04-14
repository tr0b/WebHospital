import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Visit } from "../../models/visit.model";
import { VisitsService } from "./../visits.service";
import { PatientsService } from "../../patients/patients.service";
import { RoomsService } from "../../room/room.service";
import { Room } from "../../models/room.model";
import { Doctor } from "../../models/doctor.model";
import { Plant } from "../../models/plant.model";
import { DoctorsService } from "../../doctors/doctors.service";
import { PlantsService } from "../../plants/plant.service";
import { Subscription } from "rxjs";
//Front End - Create Visits .ts
@Component({
  selector: "app-visits-create",
  templateUrl: "./visits-create.component.html",
  styleUrls: ["./visits-create.component.css"]
})
export class VisitCreateComponent implements OnInit {
  selectedDoctor: string;
  selectedPlant: string;
  patientId: string;
  doctor: any;
  plant: any;
  doctors: Doctor[];
  plants: Plant[];
  plantSub: Subscription;
  doctorSub: Subscription;
  constructor(
    public visitsService: VisitsService,
    public patientsService: PatientsService,
    public plantsService: PlantsService,
    public doctorsService: DoctorsService
  ) {}

  onAddVisit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const visit: Visit = {
      doctor: this.selectedDoctor,
      patient: this.patientId,
      plant: this.selectedPlant,
      description: form.value.description
    };
    this.visitsService.addVisit(visit);
  }
  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
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
  onChangePlant(plant: any) {
    console.log(plant);
    this.plant = plant;
  }
  onChangeDoctor(doctor: any) {
    console.log(doctor);
    this.doctor = doctor;
  }
}
