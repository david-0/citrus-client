import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IAddress} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AddressTO} from "../../../TransferObjects/AddressTO";
import {AddressDatabaseService} from "../address-database.service";

@Component({
  selector: "app-address-details-component",
  templateUrl: "./address-details.component.html",
  styleUrls: ["./address-details.component.scss"]
})
export class AddressDetailsComponent  implements OnInit {
  private _address: Observable<IAddress> = new BehaviorSubject<IAddress>(AddressTO.createEmpty());

  constructor(private route: ActivatedRoute, private database: AddressDatabaseService) {
  }

  public get address() {
    return this._address;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._address = this.database.get(+params["id"]);
    });
  }
}