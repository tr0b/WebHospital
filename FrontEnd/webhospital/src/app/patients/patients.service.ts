import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Patient } from "../models/patient.model";
import { HttpClient } from "@angular/common/http";
@Injectable({ providedIn: "root" })
export class PatientsService {
  //Patient List
  private patients: Patient[] = [];
  //Updated Patient List after POST
  private patientsUpdated = new Subject<Patient[]>();
  //Constructor with HttpClient
  constructor(private httpClient: HttpClient) {}
  //URL string
  private url: String = "http://localhost:3000/api/v1/";

  //Obtain all Patients
  getPatients() {
    return this.httpClient
      .get<{ patients: Patient[] }>(this.url + "patients")
      .subscribe(patientData => {
        this.patients = patientData;
        this.patientsUpdated.next([...this.patients]);
      });
  }
  getPatientUpdateListener() {
    return this.patientsUpdated.asObservable();
  }
  addPatient(patient: Patient) {
    console.log(patient);
    /* this.patients.push(patient);
     * this.patientsUpdated.next([...this.patients]); */
  }
}