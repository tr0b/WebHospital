import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DoctorsService } from "../doctors.service";
import { Doctor } from "../../models/doctor.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";
import { NgForm } from "@angular/forms";

//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor-detail.component.html",
  styleUrls: ["./doctor-detail.component.css"]
})
export class DoctorDetailComponent implements OnInit {
  doctor: Doctor;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectDoctor: string;
  id: string;

  constructor(
    private router: ActivatedRoute,
    private doctorsService: DoctorsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];
      this.getDoctor(this.id);
    });
  }

  ngOnInit() {}

  getDoctor(id: string) {
    this.doctorsService.getDoctor(id).subscribe((data: Doctor) => {
      this.doctor = data;
      console.log(this.doctor);
    });
  }

  //Doctor gets updated with PATCH method
  patchDoctor() {
    this.edit = !this.edit;
  }

  onPatchDoctor(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form.value.gender);
    const boolean = form.value.isActive === "Active" ? true : false;
    const freshdoctor: Doctor = {
      idCard: form.value.idCard,
      name: form.value.name,
      last_name: form.value.last_name,
      birthDate: form.value.birthDate,
      isActive: boolean,
      gender: form.value.gender,
      specialty: form.value.specialty,
      email: form.value.email
    };

    console.log("Imprimiendo formulario...");
    console.log(freshdoctor);
    console.log("Formulario impreso");
    this.doctorsService.patchDoctor(freshdoctor, this.id);
  }
  onRemoveDoctor() {
    this.doctorsService.removeDoctor(this.id);
    return;
  }
}
