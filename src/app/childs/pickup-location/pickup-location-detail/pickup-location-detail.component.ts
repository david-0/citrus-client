import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {Subscription} from "rxjs/Subscription";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-pickup-location-detail",
  templateUrl: "./pickup-location-detail.component.html",
  styleUrls: ["./pickup-location-detail.component.scss"]
})
export class PickupLocationDetailComponent implements OnInit, OnDestroy {
  private _pickupLocation: PickupLocationDto = PickupLocationDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: PickupLocationWithOpeninghHoursDtoRestService) {
  }

  public get pickupLocation(): PickupLocationDto {
    return this._pickupLocation;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const promise = this.rest.get(+params["id"]);
      this.subscription = promise.subscribe((pickupLocation) => {
        this._pickupLocation = pickupLocation;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
