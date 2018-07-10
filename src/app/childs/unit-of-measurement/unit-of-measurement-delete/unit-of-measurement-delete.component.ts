import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

@Component({
  selector: "app-unit-of-measurement-delete",
  templateUrl: "./unit-of-measurement-delete.component.html",
  styleUrls: ["./unit-of-measurement-delete.component.scss"]
})
export class UnitOfMeasurementDeleteComponent extends BaseDeleteComponent<UnitOfMeasurementDto> {

  constructor(route: ActivatedRoute,
              rest: UnitOfMeasurementDtoRestService) {
    super(route, rest, "Die Masseinheit");
  }

}
