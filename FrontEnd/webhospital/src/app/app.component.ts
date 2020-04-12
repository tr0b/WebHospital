import { Component } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isOutsider: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/login" || event.url === "/register") {
          this.isOutsider = true;
        } else {
          this.isOutsider = false;
        }
      }
    });
  }
  title = "webhospital";
}
