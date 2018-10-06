import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LocationDto} from "citrus-common";
import {Subscription} from "rxjs";
import {LocationWithOpeninghHoursDtoRestService} from "../location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  private _location: LocationDto = LocationDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: LocationWithOpeninghHoursDtoRestService) {
  }

  public get location(): LocationDto {
    return this._location;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const promise = this.rest.get(+params["id"]);
      this.subscription = promise.subscribe((pickupLocation) => {
        this._location = pickupLocation;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
