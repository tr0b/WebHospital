import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { LogInService } from "../login/login.service";
@Injectable({ providedIn: "root" })
export class UsersService {
  //User List
  private users: User[] = [];
  //Updated User List after POST
  private usersUpdated = new Subject<User[]>();
  userIdSource = new BehaviorSubject("-");
  currentUserId = this.userIdSource.asObservable();
  //Constructor with HttpClient
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private logInService: LogInService,
    private router: Router
  ) {}
  //URL string

  //Obtain all Users
  getUsers() {
    return this.httpClient
      .get<User[]>(environment.API_PATH + "users")
      .subscribe(userData => {
        this.users = userData;
        this.usersUpdated.next([...this.users]);
      });
  }

  //Obtain a User
  getUser(id: string) {
    return this.httpClient.get(environment.API_PATH + "user/" + id);
  }
  //Obtain my User
  getMyUser() {
    return this.httpClient.get(environment.API_PATH + "profile");
  }
  //Update My User
  patchProfile(user: any) {
    console.log(user);
    this.httpClient
      .patch(environment.API_PATH + "profile", user)
      .subscribe(responseData => {
        console.log(responseData);
        this.usersUpdated.next([...this.users]);
        this.toastr.success("¡Usuario Actualizado Exitosamente!", "¡Exito!");
        this.router.navigate(["/"]);
      });
  }
  //Update My User
  patchPassword(data: any) {
    console.log(data);
    this.httpClient
      .patch(environment.API_PATH + "profile", data)
      .subscribe(responseData => {
        console.log(responseData);
        this.usersUpdated.next([...this.users]);
        this.toastr.success("¡Usuario Actualizado Exitosamente!", "¡Exito!");
        this.logInService.logOut();
      });
  }
  //Update User
  patchUser(user: any, id) {
    console.log(user);
    this.httpClient
      .patch(environment.API_PATH + "user/" + id, user)
      .subscribe(responseData => {
        console.log(responseData);
        this.usersUpdated.next([...this.users]);
        this.toastr.success("¡Usuario Actualizado Exitosamente!", "¡Exito!");
        this.router.navigate(["/"]);
      });
  }
  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }
  //"Removes" User
  removeUser(id: any) {
    const removeUserTrigger = { isActive: false };
    this.httpClient
      .patch(environment.API_PATH + "user/" + id, removeUserTrigger)
      .subscribe(responseData => {
        console.log(responseData);
        this.usersUpdated.next([...this.users]);
        this.toastr.success("¡Usuario Eliminado Exitosamente!", "¡Exito!");
        this.router.navigate(["/users"]);
      });
  }
  changeUserId(id: string) {
    this.userIdSource.next(id);
  }
}
