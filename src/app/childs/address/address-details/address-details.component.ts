import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AddressDto} from "citrus-common";
import {Subscription} from "rxjs";
import {AddressDtoRestService} from "../address-dto-rest.service";
import {AddressWithUserDtoRestService} from "../address-with-user-dto-rest.service";

@Component({
  selector: "app-address-details-component",
  templateUrl: "./address-details.component.html",
  styleUrls: ["./address-details.component.scss"]
})
export class AddressDetailsComponent implements OnInit, OnDestroy {
  private _address: AddressDto = AddressDto.createEmpty();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private rest: AddressWithUserDtoRestService) {
  }

  public get address(): AddressDto {
    return this._address;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const addressPromise = this.rest.get(+params["id"]);
      this.subscription = addressPromise.subscribe((address) => {
        this._address = address;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
