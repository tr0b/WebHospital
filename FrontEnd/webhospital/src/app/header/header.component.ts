import { Component, OnInit, OnDestroy } from "@angular/core";
import { LogInService } from "../login/login.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",

  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  userIsAuthenticated: boolean = false;
  constructor(private logInService: LogInService) {}
  ngOnInit() {
    this.authListenerSubs = this.logInService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onLogout() {
    this.logInService.logOut();
  }
}
