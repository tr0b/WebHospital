import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class LogInService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  //Constructor with HttpClient
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  logIn(userData: any) {
    this.httpClient
      .post<{ token: string }>(environment.API_PATH + "login", userData)
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        this.toastr.success("¡Usuario Ingresado Exitosamente!", "¡Exito!");
        this.router.navigateByUrl("/");
        if (token) {
          this.isAuthenticated = true;

          this.authStatusListener.next(true);
        }
      });
  }
  logOut() {
    this.httpClient.get(environment.API_PATH + "logout").subscribe(res => {
      this.token = "";
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.router.navigateByUrl("/");
      this.toastr.success("¡Ha cerrado la Session!", "¡Exito!");
    });
  }
}
