import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PatientsComponent } from "./patients/patients.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { VisitsComponent } from "./visits/visits.component";
import { HistoriesComponent } from "./histories/histories.component";
import { PatientCreateComponent } from "./patients/patient-create/patient-create.component";
import { DoctorCreateComponent } from "./doctors/doctors-create/doctors-create.component";
import { VisitCreateComponent } from "./visits/visits-create/visits-create.component";
import { PatientDetailComponent } from "./patients/patient-detail/patient-detail.component";
import { DoctorDetailComponent } from "./doctors/doctor-detail/doctor-detail.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "patients",
    component: PatientsComponent
  },
  { path: "patient/:id", component: PatientDetailComponent },
  { path: "doctor/:id", component: DoctorDetailComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "visits", component: VisitsComponent },
  { path: "histories", component: HistoriesComponent },
  { path: "addPatient", component: PatientCreateComponent },
  { path: "addDoctor", component: DoctorCreateComponent },
  { path: "addVisit", component: VisitCreateComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
