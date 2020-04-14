import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Room } from "../../models/room.model";
import { RoomsService } from "./../room.service";
import { PlantsService } from "../../plants/plant.service";
//Front End - Create Rooms .ts
@Component({
  selector: "app-rooms-create",
  templateUrl: "./room-create.component.html",
  styleUrls: ["./room-create.component.css"]
})
export class RoomCreateComponent implements OnInit {
  plantId: string;
  constructor(
    public roomsService: RoomsService,
    public plantsService: PlantsService
  ) {}

  onAddRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const room: Room = {
      plant: this.plantId,
      name: form.value.name
    };
    this.roomsService.addRoom(room);
  }
  ngOnInit() {
    this.plantsService.currentPlantId.subscribe(
      plantId => (this.plantId = plantId)
    );
  }
}
