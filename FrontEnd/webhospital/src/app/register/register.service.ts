import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class RegisterService {
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
  //Obtain my User Profile
  getMyProfile() {
    return this.httpClient.get(environment.API_PATH + "profile");
  }
  //Update my Profile
  patchMyProfile(user: any) {
    console.log(user);
    this.httpClient
      .patch(environment.API_PATH + "profile", user)
      .subscribe(responseData => {
        console.log(responseData);
        this.usersUpdated.next([...this.users]);
        this.toastr.success("¡Perfil Actualizado Exitosamente!", "¡Exito!");
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
      });
  }
  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }
  //Add Users
  addUser(user: User) {
    this.httpClient
      .post(environment.API_PATH + "register", user)
      .subscribe(responseData => {
        console.log(responseData);
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.toastr.success("¡Usuario Ingresado Exitosamente!", "¡Exito!");
        this.router.navigateByUrl("/");
      });
  }
  changeUserId(id: string) {
    this.userIdSource.next(id);
  }
}
