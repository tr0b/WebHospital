import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { History } from "../../models/history.model";
import { HistoriesService } from "./../histories.service";
import { PatientsService } from "../../patients/patients.service";
import { Room } from "../../models/room.model";
import { RoomsService } from "../../room/room.service";
import { Subscription } from "rxjs";
//Front End - Create Histories .ts
@Component({
  selector: "app-histories-create",
  templateUrl: "./histories-create.component.html",
  styleUrls: ["./histories-create.component.css"]
})
export class HistoryCreateComponent implements OnInit {
  room: any;
  rooms: Room[];
  selectedRoom: string;
  roomSub: Subscription;
  patientId: string;
  constructor(
    public historiesService: HistoriesService,
    public patientsService: PatientsService,
    public roomsService: RoomsService
  ) {}

  onAddHistory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const history: History = {
      patient: this.patientId,
      room: this.selectedRoom,
      dateIn: form.value.dateIn,
      dateOut: form.value.dateOut,
      bedId: form.value.bedId
    };
    this.historiesService.addHistory(history);
  }
  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
    this.roomsService.getAllRooms();
    this.roomSub = this.roomsService
      .getRoomUpdateListener()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }
  onChangeRoom(room: any) {
    this.room = room;
  }
}
