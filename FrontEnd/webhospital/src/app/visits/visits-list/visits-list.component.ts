import { Component, OnInit, OnDestroy } from "@angular/core";
import { Visit } from "../../models/visit.model";
import { Subscription } from "rxjs/Subscription";
import { VisitsService } from "../visits.service";
import { ActivatedRoute } from "@angular/router";

import { NgForm } from "@angular/forms";
@Component({
  selector: "app-visits-list",
  templateUrl: "./visits-list.component.html",
  styleUrls: ["./visits-list.component.css"]
})
export class VisitsListComponent implements OnInit, OnDestroy {
  visits: Visit[] = [];
  patientId: string;
  private visitSub: Subscription;
  constructor(
    public visitsService: VisitsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.patientId = params["id"];
    });
  }

  ngOnInit() {
    this.visitsService.getVisits(this.patientId);
    this.visitSub = this.visitsService
      .getVisitUpdateListener()
      .subscribe((visits: Visit[]) => {
        this.visits = visits;
      });
  }

  ngOnDestroy() {
    this.visitSub.unsubscribe();
  }
}
