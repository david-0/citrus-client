import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AddressDto} from "citrus-common";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {AddressDtoRestService} from "../address-dto-rest.service";

@Component({
  selector: "app-address-delete",
  templateUrl: "./address-delete.component.html",
  styleUrls: ["./address-delete.component.scss"]
})
export class AddressDeleteComponent extends BaseDeleteComponent<AddressDto> {

  constructor(route: ActivatedRoute,
              rest: AddressDtoRestService) {
    super(route, rest, "Die Adresse");
  }
}
