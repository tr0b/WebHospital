import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RegisterService } from "./register.service";
import { User } from "../models/user.model";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  constructor(public registerService: RegisterService) {}

  ngOnInit() {}
  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user: User = {
      name: form.value.firstName,
      last_name: form.value.lastName,
      email: form.value.email,
      password: form.value.password
    };

    this.registerService.addUser(user);
  }
}
