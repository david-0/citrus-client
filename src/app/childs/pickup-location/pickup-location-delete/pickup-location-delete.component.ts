import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {PickupLocationDtoService} from "../pickup-location-dto.service";

@Component({
  selector: "app-pickup-location-delete",
  templateUrl: "./pickup-location-delete.component.html",
  styleUrls: ["./pickup-location-delete.component.scss"]
})
export class PickupLocationDeleteComponent extends BaseDeleteComponent<PickupLocationDto> {

  constructor(route: ActivatedRoute,
              rest: PickupLocationDtoService) {
    super(route, rest, "Abholstation");
  }
}
