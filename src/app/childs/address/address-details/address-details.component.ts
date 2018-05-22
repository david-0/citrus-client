import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AddressDto} from "citrus-common";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AddressDatabaseService} from "../address-database.service";

@Component({
  selector: "app-address-details-component",
  templateUrl: "./address-details.component.html",
  styleUrls: ["./address-details.component.scss"]
})
export class AddressDetailsComponent  implements OnInit {
  private _address: Observable<AddressDto> = new BehaviorSubject<AddressDto>(AddressDto.createEmpty());

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
