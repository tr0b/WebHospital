import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlantsService } from "../plant.service";
import { Plant } from "../../models/plant.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";
//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-plant",
  templateUrl: "./plant-detail.component.html",
  styleUrls: ["./plant-detail.component.css"]
})
export class PlantDetailComponent implements OnInit {
  plant: Plant;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectPlant: string;
  plantId: string;
  last_name;
  id: string;

  constructor(
    private router: ActivatedRoute,
    private plantsService: PlantsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];

      this.getPlant(this.id);
    });
  }

  ngOnInit() {
    this.plantsService.currentPlantId.subscribe(plantId => {
      this.plantId = plantId;
      console.log(plantId);
    });

    this.plantsService
      .getPlant(this.plantId)
      .subscribe((plant: any) => (this.plant = plant));
  }

  getPlant(id: string) {
    this.plantsService.getPlant(id).subscribe((data: Plant) => {
      this.plant = data;
      console.log(this.plant);
    });
  }

  //Plant gets updated with PATCH method
  patchPlant() {
    this.edit = !this.edit;
  }

  onPatchPlant(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const freshplant: Plant = {
      name: form.value.name
    };

    console.log("Imprimiendo formulario...");
    console.log(freshplant);
    console.log("Formulario impreso");
    this.plantsService.patchPlant(freshplant, this.id);
  }
  onRemovePlant(status: boolean) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      maxWidth: "600px",
      data: {
        title: "Eliminar Planta",
        message: "¿Esta Seguro Que Desea Eliminar la Planta?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        //if User pressed Yes
        this.plantsService.removePlant(this.id);
        return;
      }
    });
  }
}
