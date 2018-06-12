import {Component, OnInit} from "@angular/core";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {BehaviorSubject} from "rxjs/Rx";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-pickup-location-overview",
  templateUrl: "./pickup-location-overview.component.html",
  styleUrls: ["./pickup-location-overview.component.scss"]
})
export class PickupLocationOverviewComponent implements OnInit {
  public displayedColumns = ["description", "address", "openingHours"];
  public dataObservable = new BehaviorSubject<PickupLocationDto[]>([]);

  constructor(private rest: PickupLocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.dataObservable.next(data);
    });
  }

}
