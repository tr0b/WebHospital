import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HistoriesService } from "../histories.service";
import { History } from "../../models/history.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Patient } from "../../models/patient.model";
import { PatientsService } from "../../patients/patients.service";

//ToastrService
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";

import { RoomsService } from "../../room/room.service";
import { Room } from "../../models/room.model";
import { Subscription } from "rxjs";
@Component({
  selector: "app-history",
  templateUrl: "./history-detail.component.html",
  styleUrls: ["./history-detail.component.css"]
})
export class HistoryDetailComponent implements OnInit {
  room: any;
  history: History;
  rooms: Room[] = [];
  private roomSub: Subscription;
  edit: boolean = false;
  selectInfo: any[] = [];
  selectHistory: string;
  id: string;
  patientId: string;
  private patient: Patient;

  constructor(
    private router: ActivatedRoute,
    private historiesService: HistoriesService,
    public patientsService: PatientsService,
    public roomService: RoomsService,
    private toastr: ToastrService
  ) {
    this.router.params.subscribe(params => {
      this.id = params["id"];
      this.getHistory(this.id);
    });
  }

  ngOnInit() {
    this.patientsService.currentPatientId.subscribe(
      patientId => (this.patientId = patientId)
    );
    this.roomService.getAllRooms();
    this.roomSub = this.roomService
      .getRoomUpdateListener()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  getHistory(id: string) {
    this.historiesService.getHistory(id).subscribe((data: History) => {
      this.history = data;
      console.log(this.history);
    });
  }

  //History gets updated with PATCH method
  patchHistory() {
    this.edit = !this.edit;
  }

  onPatchHistory(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const freshhistory: History = {
      dateIn: form.value.dateIn,
      dateOut: form.value.dateOut,
      bedId: form.value.bedId,
      patient: this.patientId,
      room: this.room._id
    };

    console.log("Imprimiendo formulario...");
    console.log(freshhistory);
    console.log("Formulario impreso");
    this.historiesService.patchHistory(freshhistory, this.id);
  }
  onChangeRoom(room: any) {
    console.log(room);
    this.room = room;
  }
}
