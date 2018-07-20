import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {BehaviorSubject} from "rxjs";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../../pickup-location/pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-opening-hour-overview",
  templateUrl: "./opening-hour-overview.component.html",
  styleUrls: ["./opening-hour-overview.component.scss"]
})
export class OpeningHourOverviewComponent implements OnInit {

  public id: number;

  dataObservable = new BehaviorSubject<OpeningHourDto[]>([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: PickupLocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      if (params["id"] !== null) {
        this.id = +params["id"];
        this.rest.get(+params["id"]).subscribe(pickupLocation => {
          this.dataObservable.next(pickupLocation.openingHours);
        });
      }
    });

  }

}
