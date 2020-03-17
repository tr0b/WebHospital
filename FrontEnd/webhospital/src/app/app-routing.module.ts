import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PatientsListComponent } from "./patients/patients-list/patients-list.component";
import { DoctorsListComponent } from "./doctors/doctors-list/doctors-list.component";
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "patients", component: PatientsListComponent },
  { path: "doctors", component: DoctorsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
