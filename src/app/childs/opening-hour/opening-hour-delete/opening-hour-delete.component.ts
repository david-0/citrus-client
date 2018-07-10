import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {OpeningHourDtoRestService} from "../opening-hour-dto-rest.service";

@Component({
  selector: "app-opening-hour-delete",
  templateUrl: "./opening-hour-delete.component.html",
  styleUrls: ["./opening-hour-delete.component.scss"]
})
export class OpeningHourDeleteComponent extends BaseDeleteComponent<OpeningHourDto> {

  constructor(route: ActivatedRoute,
              rest: OpeningHourDtoRestService) {
    super(route, rest, "Die Öffnungszeit");
  }
}
