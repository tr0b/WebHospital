import { Component, OnInit, OnDestroy } from "@angular/core";
import { History } from "../../models/history.model";
import { Subscription } from "rxjs/Subscription";
import { HistoriesService } from "../histories.service";
import { ActivatedRoute } from "@angular/router";

import { NgForm } from "@angular/forms";
@Component({
  selector: "app-histories-list",
  templateUrl: "./histories-list.component.html",
  styleUrls: ["./histories-list.component.css"]
})
export class HistoriesListComponent implements OnInit, OnDestroy {
  histories: History[] = [];
  patientId: string;
  private historySub: Subscription;
  constructor(
    public historiesService: HistoriesService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.patientId = params["id"];
    });
  }

  ngOnInit() {
    this.historiesService.getHistories(this.patientId);
    this.historySub = this.historiesService
      .getHistoryUpdateListener()
      .subscribe((histories: History[]) => {
        this.histories = histories;
      });
  }

  ngOnDestroy() {
    this.historySub.unsubscribe();
  }
}
