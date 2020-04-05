import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Patient } from "../models/patient.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: "root" })
export class PatientsService {
  //Patient List
  private patients: Patient[] = [];
  //Updated Patient List after POST
  private patientsUpdated = new Subject<Patient[]>();
  //Constructor with HttpClient
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  //URL string

  //Obtain all Patients
  getPatients() {
    return this.httpClient
      .get<Patient[]>(environment.API_PATH + "patients")
      .subscribe(patientData => {
        this.patients = patientData;
        this.patientsUpdated.next([...this.patients]);
      });
  }
  getPatientUpdateListener() {
    return this.patientsUpdated.asObservable();
  }
  //Add Patients
  addPatient(patient: Patient) {
    this.httpClient
      .post(environment.API_PATH + "patient", patient)
      .subscribe(responseData => {
        console.log(responseData);
        this.patients.push(patient);
        this.patientsUpdated.next([...this.patients]);
        this.toastr.success("¡Paciente Ingresado Exitosamente!", "¡Exito!");
        console.log("La notificacion se disparo");
      });
  }
}
