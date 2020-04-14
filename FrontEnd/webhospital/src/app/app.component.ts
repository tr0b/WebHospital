import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { LogInService } from "./login/login.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isOutsider: boolean = false;
  constructor(private router: Router, private logInService: LogInService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        //Mechanism to Hide header bar in case user is in login or register page
        if (event.url === "/login" || event.url === "/register") {
          this.isOutsider = true;
        } else {
          this.isOutsider = false;
        }
      }
    });
  }
  ngOnInit() {
    this.logInService.autoAuthUser();
  }
  title = "webhospital";
}
