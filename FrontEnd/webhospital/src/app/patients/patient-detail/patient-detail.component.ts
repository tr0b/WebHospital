import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PatientsService } from "../patients.service";
import { Patient } from "../../models/patient.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";
//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-patient",
  templateUrl: "./patient-detail.component.html",
  styleUrls: ["./patient-detail.component.css"]
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectPatient: string;
  patientId: string;
  last_name;
  id: string;

  constructor(
    private router: ActivatedRoute,
    private patientsService: PatientsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];

      this.getPatient(this.id);
    });
  }

  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(patientId => {
      this.patientId = patientId;
      console.log(patientId);
    });

    this.patientsService
      .getPatient(this.patientId)
      .subscribe((patient: any) => (this.patient = patient));
  }

  getPatient(id: string) {
    this.patientsService.getPatient(id).subscribe((data: Patient) => {
      this.patient = data;
      console.log(this.patient);
    });
  }

  //Patient gets updated with PATCH method
  patchPatient() {
    this.edit = !this.edit;
  }

  onPatchPatient(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const freshpatient: Patient = {
      idCard: form.value.idCard,
      name: form.value.name,
      last_name: form.value.last_name,
      birthDate: form.value.birthDate,
      bloodType: form.value.bloodType,
      gender: form.value.gender
    };

    console.log("Imprimiendo formulario...");
    console.log(freshpatient);
    console.log("Formulario impreso");
    this.patientsService.patchPatient(freshpatient, this.id);
  }
  onRemovePatient(status: boolean) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      maxWidth: "600px",
      data: {
        title: "Eliminar Paciente",
        message: "¿Esta Seguro Que Desea Eliminar el Paciente?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        //if User pressed Yes
        this.patientsService.removePatient(this.id);
        return;
      }
    });
  }
}
