import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {Subscription} from "rxjs";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../../pickup-location/pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-opening-hour-details",
  templateUrl: "./opening-hour-details.component.html",
  styleUrls: ["./opening-hour-details.component.scss"]
})
export class OpeningHourDetailsComponent implements OnInit, OnDestroy {
  private _pickupLocation: PickupLocationDto = PickupLocationDto.createEmpty();
  private _openingHour: OpeningHourDto = OpeningHourDto.createEmpty(this._pickupLocation);
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: PickupLocationWithOpeninghHoursDtoRestService) {
  }

  public get openingHour(): OpeningHourDto {
    return this._openingHour;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(pickupLocationParams => {
      const promise = this.rest.get(+pickupLocationParams["id"]);
      this.subscription = promise.subscribe((pickupLocation) => {
        this._pickupLocation = pickupLocation;
        this.route.params.subscribe(openingHourParams => {
          this._openingHour = this._pickupLocation.openingHours.filter(o => o.id === +openingHourParams["id"])[0];
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
