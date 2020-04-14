import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RoomsService } from "../room.service";
import { Room } from "../../models/room.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Plant } from "../../models/plant.model";
import { PlantsService } from "../../plants/plant.service";
import { Doctor } from "../../models/doctor.model";
import { DoctorsService } from "../../doctors/doctors.service";
import { Subscription } from "rxjs";
//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-room",
  templateUrl: "./room-detail.component.html",
  styleUrls: ["./room-detail.component.css"]
})
export class RoomDetailComponent implements OnInit, OnDestroy {
  room: any;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectRoom: string;
  id: string;
  plantId: string;
  plant: any;
  plants: Plant[] = [];
  private plantSub: Subscription;
  constructor(
    private router: ActivatedRoute,
    private roomsService: RoomsService,
    public plantsService: PlantsService,
    public doctorsService: DoctorsService,
    private toastr: ToastrService
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];
      this.getRoom(this.id);
    });
  }

  ngOnInit() {
    this.plantsService.currentPlantId.subscribe(
      plantId => (this.plantId = plantId)
    );
    this.plantsService.getPlants();
    this.plantSub = this.plantsService
      .getPlantUpdateListener()
      .subscribe((plants: Plant[]) => {
        this.plants = plants;
      });
  }

  getRoom(id: string) {
    this.roomsService.getRoom(id).subscribe((res: any) => {
      console.log(res);
      this.room = res;
    });
  }
  onChangePlant(plant: any) {
    console.log(plant);
    this.plant = plant;
  }

  //Room gets updated with PATCH method
  patchRoom() {
    this.edit = !this.edit;
  }

  onPatchRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const freshroom: Room = {
      plant: form.value.selectedPlant,
      name: form.value.room
    };

    console.log("Imprimiendo formulario...");
    console.log(freshroom);
    console.log("Formulario impreso");
    this.roomsService.patchRoom(freshroom, this.id);
  }
  ngOnDestroy() {
    this.plantSub.unsubscribe();
  }
}
