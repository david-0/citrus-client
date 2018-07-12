import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {OpeningHourDtoRestService} from "../opening-hour-dto-rest.service";

@Component({
  selector: "app-opening-hour-delete",
  templateUrl: "./opening-hour-delete.component.html",
  styleUrls: ["./opening-hour-delete.component.scss"]
})
export class OpeningHourDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<OpeningHourDto>;

  constructor(private route: ActivatedRoute,
              private rest: OpeningHourDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<OpeningHourDto>(this.route, this.rest, "Die Öffnungszeit");
    this.deleteExecutor.initDelete();
  }
}
