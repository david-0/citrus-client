import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {Subscription} from "rxjs";
import {LocationWithOpeninghHoursDtoRestService} from "../../location/location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-opening-hour-details",
  templateUrl: "./opening-hour-details.component.html",
  styleUrls: ["./opening-hour-details.component.scss"]
})
export class OpeningHourDetailsComponent implements OnInit, OnDestroy {
  private _openingHour: OpeningHourDto = OpeningHourDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: LocationWithOpeninghHoursDtoRestService) {
  }

  public get openingHour(): OpeningHourDto {
    return this._openingHour;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(locationParams => {
      const promise = this.rest.get(+locationParams["id"]);
      this.subscription = promise.subscribe((location) => {
        this.route.params.subscribe(openingHourParams => {
          this._openingHour = location.openingHours.filter(o => o.id === +openingHourParams["id"])[0];
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
