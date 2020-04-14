import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Room } from "../models/room.model";
import { Doctor } from "../models/doctor.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class RoomsService {
  //Room List
  private rooms: Room[] = [];
  //Updated Room List after POST
  private roomsUpdated = new Subject<Room[]>();
  //Constructor with HttpClient
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  //URL string

  //Obtain all Rooms in plant
  getRooms(id: any) {
    return this.httpClient
      .get<Room[]>(environment.API_PATH + "rooms/" + id)
      .subscribe(roomData => {
        this.rooms = roomData;
        this.roomsUpdated.next([...this.rooms]);
      });
  }
  //obtain all rooms
  getAllRooms() {
    return this.httpClient
      .get<Room[]>(environment.API_PATH + "rooms")
      .subscribe(roomData => {
        this.rooms = roomData;
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  //Obtain a Room
  getRoom(id: string) {
    return this.httpClient.get(environment.API_PATH + "room/" + id);
  }
  //Update Room
  patchRoom(room: any, id) {
    console.log(room);
    this.httpClient
      .patch(environment.API_PATH + "room/" + id, room)
      .subscribe(responseData => {
        console.log(responseData);
        this.roomsUpdated.next([...this.rooms]);
        this.toastr.success("¡Habitacion Actualizada Exitosamente!", "¡Exito!");

        this.router.navigate(["/plants"]);
      });
  }
  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
  //Add Rooms
  addRoom(room: Room) {
    this.httpClient
      .post(environment.API_PATH + "room", room)
      .subscribe(responseData => {
        console.log(responseData);
        this.rooms.push(room);
        this.roomsUpdated.next([...this.rooms]);
        this.toastr.success("¡Habitacion Ingresada Exitosamente!", "¡Exito!");
        this.router.navigate(["/plants"]);
      });
  }
}
