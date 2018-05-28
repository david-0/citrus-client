import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-unit-of-measurement-overview",
  templateUrl: "./unit-of-measurement-overview.component.html",
  styleUrls: ["./unit-of-measurement-overview.component.scss"]
})
export class UnitOfMeasurementOverviewComponent implements OnInit {
  public displayedColumns = ["id", "shortcut", "description"];

  constructor() {
  }

  ngOnInit() {
  }

}
