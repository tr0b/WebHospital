import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Doctor } from "../models/doctor.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class DoctorsService {
  //currentDoctorId && Source
  doctorIdSource = new BehaviorSubject("-");
  currentDoctorId = this.doctorIdSource.asObservable();
  //Doctor List
  private doctors: Doctor[] = [];
  //Updated Doctor List after POST
  private doctorsUpdated = new Subject<Doctor[]>();
  //Constructor with HttpClient
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //Obtain all Doctors
  getDoctors() {
    return this.httpClient
      .get<Doctor[]>(environment.API_PATH + "doctors")
      .subscribe(doctorData => {
        this.doctors = doctorData;
        this.doctorsUpdated.next([...this.doctors]);
      });
  }
  //Obtain a Doctor
  getDoctor(id: string) {
    return this.httpClient.get(environment.API_PATH + "doctor/" + id);
  }
  getDoctorUpdateListener() {
    return this.doctorsUpdated.asObservable();
  }
  //Add Doctors
  addDoctor(doctor: Doctor) {
    this.httpClient
      .post(environment.API_PATH + "doctor", doctor)
      .subscribe(responseData => {
        console.log(responseData);
        this.doctors.push(doctor);
        this.doctorsUpdated.next([...this.doctors]);
        this.toastr.success("¡Paciente Ingresado Exitosamente!", "¡Exito!");
        console.log("La notificacion se disparo");
      });
  }
  patchDoctor(doctor: any, id) {
    console.log(doctor);
    this.httpClient
      .patch(environment.API_PATH + "doctor/" + id, doctor)
      .subscribe(responseData => {
        console.log(responseData);
        this.doctorsUpdated.next([...this.doctors]);
      });

    this.toastr.success("¡Paciente Actualizado Exitosamente!", "¡Exito!");
  }

  //"Removes" Doctor
  removeDoctor(id: any) {
    const removeDoctorTrigger = { isActive: false };
    this.httpClient
      .patch(environment.API_PATH + "doctor/" + id, removeDoctorTrigger)
      .subscribe(responseData => {
        console.log(responseData);
        this.doctorsUpdated.next([...this.doctors]);
        this.toastr.success("¡Paciente Eliminado Exitosamente!", "¡Exito!");
        this.router.navigate(["/doctors"]);
      });
  }
  changeDoctorId(id: string) {
    this.doctorIdSource.next(id);
  }
}
