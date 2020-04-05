import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { PatientsComponent } from "./patients/patients.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { VisitsComponent } from "./visits/visits.component";
import { MedicinesComponent } from "./medicines/medicines.component";
import { DoctorsListComponent } from "./doctors/doctors-list/doctors-list.component";
import { VisitsListComponent } from "./visits/visits-list/visits-list.component";
import { VisitItemComponent } from "./visits/visits-list/visit-item/visit-item.component";
import { PatientsListComponent } from "./patients/patients-list/patients-list.component";
import { PatientDetailComponent } from "./patients/patient-detail/patient-detail.component";
import { PatientItemComponent } from "./patients/patients-list/patient-item/patient-item.component";
import { DoctorItemComponent } from "./doctors/doctors-list/doctor-item/doctor-item.component";
import { DoctorEditComponent } from "./doctors/doctors-list/doctor-edit/doctor-edit.component";
import { PatientEditComponent } from "./patients/patients-list/patient-edit/patient-edit.component";
import { VisitEditComponent } from "./visits/visits-list/visit-edit/visit-edit.component";
import { HttpClientModule } from "@angular/common/http";
import { Routes } from "@angular/router";
import { LogoComponent } from "./logo/logo.component";
import { FormsModule } from "@angular/forms";
import { PatientCreateComponent } from "./patients/patient-create/patient-create.component";
import { UsersComponent } from "./users/users.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DoctorCreateComponent } from "./doctors/doctors-create/doctors-create.component";
import { VisitCreateComponent } from "./visits/visits-create/visits-create.component";
import { HistoriesComponent } from "./histories/histories.component";
import { HistoriesListComponent } from "./histories/histories-list/histories-list.component";
import { HistoriesItemComponent } from "./histories/histories-item/histories-item.component";
import { DoctorDetailComponent } from './doctors/doctor-detail/doctor-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    PatientsComponent,
    PatientsListComponent,
    DoctorsComponent,
    VisitsComponent,
    MedicinesComponent,
    DoctorsListComponent,
    VisitsListComponent,
    VisitItemComponent,
    PatientItemComponent,
    DoctorItemComponent,
    DoctorEditComponent,
    PatientEditComponent,
    VisitEditComponent,
    LogoComponent,
    PatientCreateComponent,
    UsersComponent,
    UserDetailComponent,
    DoctorCreateComponent,
    VisitCreateComponent,
    HistoriesComponent,
    HistoriesListComponent,
    HistoriesItemComponent,
    PatientDetailComponent,
    DoctorDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
