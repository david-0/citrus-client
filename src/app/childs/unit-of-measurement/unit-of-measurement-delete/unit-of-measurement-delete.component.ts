import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

@Component({
  selector: "app-unit-of-measurement-delete",
  templateUrl: "./unit-of-measurement-delete.component.html",
  styleUrls: ["./unit-of-measurement-delete.component.scss"]
})
export class UnitOfMeasurementDeleteComponent implements  OnInit{

  public deleteExecutor: DeleteExecutor<UnitOfMeasurementDto>;

  constructor(private route: ActivatedRoute,
              private rest: UnitOfMeasurementDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<UnitOfMeasurementDto>(this.route, this.rest, "Die Masseinheit");
    this.deleteExecutor.initDelete();
  }
}
