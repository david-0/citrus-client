import {Component, OnInit} from "@angular/core";
import {LocationDto} from "citrus-common";
import {BehaviorSubject} from "rxjs";
import {LocationWithOpeninghHoursDtoRestService} from "../location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-pickup-location-overview",
  templateUrl: "./location-overview.component.html",
  styleUrls: ["./location-overview.component.scss"]
})
export class LocationOverviewComponent implements OnInit {
  public displayedColumns = ["description", "address", "openingHours"];
  public dataObservable = new BehaviorSubject<LocationDto[]>([]);

  constructor(private rest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }

}
