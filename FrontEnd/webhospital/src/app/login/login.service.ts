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
  private userName: string;
  private userEmail: string;
  private tokenTimer: any;
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
  getUserName() {
    return this.userName;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  logIn(userData: any) {
    this.httpClient
      .post<{
        token: string;
        expiresIn: number;
        userName: string;
        userEmail: string;
      }>(environment.API_PATH + "login", userData)
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userName = res.userName;
          this.userEmail = res.userEmail;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(
            token,
            expirationDate,
            this.userName,
            this.userEmail
          );
          console.log(expirationDate);
          this.router.navigateByUrl("/");
        }
      });
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userName = authInformation.userName;
      this.userEmail = authInformation.userEmail;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    } else {
      this.logOut();
    }
  }
  logOut() {
    this.httpClient.get(environment.API_PATH + "logout").subscribe(res => {
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.userName = null;
      this.userEmail = null;
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigateByUrl("/login");
    });
  }
  private setAuthTimer(duration: number) {
    console.log("Setting Timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userName: string,
    userEmail: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userName: userName,
      userEmail: userEmail
    };
  }
}
