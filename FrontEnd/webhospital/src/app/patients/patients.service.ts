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

  getPatient(id: string) {
    return this.httpClient.get(environment.API_PATH + "patient/" + id);
  }
  //Update Patient
  patchPatient(patient: any, id) {
    console.log(patient);
    this.httpClient
      .patch(environment.API_PATH + "patient/" + id, patient)
      .subscribe(responseData => {
        console.log(responseData);
        this.patientsUpdated.next([...this.patients]);
        this.toastr.success("¡Paciente Actualizado Exitosamente!", "¡Exito!");
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
