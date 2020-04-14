import { Component, OnInit } from "@angular/core";
import { LogInService } from "../login/login.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  userName: string;
  constructor(private logInService: LogInService) {}

  ngOnInit() {
    this.userName = this.logInService.getUserName();
  }
}
