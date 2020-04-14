import { Component, OnInit, OnDestroy } from "@angular/core";
import { Room } from "../../models/room.model";
import { Subscription } from "rxjs/Subscription";
import { RoomsService } from "../room.service";
import { ActivatedRoute } from "@angular/router";

import { NgForm } from "@angular/forms";
@Component({
  selector: "app-rooms-list",
  templateUrl: "./room-list.component.html",
  styleUrls: ["./room-list.component.css"]
})
export class RoomsListComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  plantId: string;
  private roomSub: Subscription;
  constructor(
    public roomsService: RoomsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.plantId = params["id"];
    });
  }

  ngOnInit() {
    this.roomsService.getRooms(this.plantId);
    this.roomSub = this.roomsService
      .getRoomUpdateListener()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
  }
}
