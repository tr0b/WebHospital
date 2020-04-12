import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LogInService } from "./login.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  constructor(public logInService: LogInService) {}

  ngOnInit() {}
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userData = {
      email: form.value.email,
      password: form.value.password
    };
    this.logInService.logIn(userData);
  }
}
