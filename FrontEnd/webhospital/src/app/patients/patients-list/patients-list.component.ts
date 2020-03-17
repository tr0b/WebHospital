import { Component, OnInit } from "@angular/core";
import { Patient } from "../../models/patient.model";
@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.css"]
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [
    new Patient("Sara", "Vazques", Date.now(), "41155444", "AB-", "Female", [
      "vazquez@ulacit.com"
    ]),
    new Patient("Emma", "Vazques", Date.now(), "41155123", "AB-", "Female", [
      "svazquez@ulacit.com"
    ])
  ];
  constructor() {}

  ngOnInit() {}
}
