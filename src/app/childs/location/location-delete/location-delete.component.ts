import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LocationDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {LocationDtoRestService} from "../location-dto-rest.service";

@Component({
  selector: "app-pickup-location-delete",
  templateUrl: "./location-delete.component.html",
  styleUrls: ["./location-delete.component.scss"]
})
export class LocationDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<LocationDto>;

  constructor(private route: ActivatedRoute,
              private rest: LocationDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<LocationDto>(this.route, this.rest, "Der Standort");
    this.deleteExecutor.initDelete();
  }
}
