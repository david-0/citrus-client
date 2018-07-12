import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {PickupLocationDtoRestService} from "../pickup-location-dto-rest.service";

@Component({
  selector: "app-pickup-location-delete",
  templateUrl: "./pickup-location-delete.component.html",
  styleUrls: ["./pickup-location-delete.component.scss"]
})
export class PickupLocationDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<PickupLocationDto>;

  constructor(private route: ActivatedRoute,
              private rest: PickupLocationDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<PickupLocationDto>(this.route, this.rest, "Die Abholstation");
    this.deleteExecutor.initDelete();
  }
}
