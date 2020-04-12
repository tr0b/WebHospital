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
import { VisitDetailComponent } from "./visits/visit-detail/visit-detail.component";
import { PatientDetailComponent } from "./patients/patient-detail/patient-detail.component";
import { DoctorDetailComponent } from "./doctors/doctor-detail/doctor-detail.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HistoryCreateComponent } from "./histories/histories-create/histories-create.component";
import { HistoryDetailComponent } from "./histories/history-detail/history-detail.component";
import { AuthGuard } from "./auth.guard";
const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "patients",
    component: PatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "patient/:id",
    component: PatientDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "histories/:id",
    component: HistoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "history/:id",
    component: HistoryDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/:id",
    component: DoctorDetailComponent,
    canActivate: [AuthGuard]
  },
  { path: "doctors", component: DoctorsComponent, canActivate: [AuthGuard] },
  { path: "visits/:id", component: VisitsComponent, canActivate: [AuthGuard] },
  {
    path: "visit/:id",
    component: VisitDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addPatient",
    component: PatientCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addDoctor",
    component: DoctorCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addVisit",
    component: VisitCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addHistory",
    component: HistoryCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
