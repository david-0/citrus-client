import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {UnitOfMeasurementWithArticlesDtoRestService} from "../unit-of-measurement-with-articles-dto-rest.service";

@Component({
  selector: "app-unit-of-measurement-delete",
  templateUrl: "./unit-of-measurement-delete.component.html",
  styleUrls: ["./unit-of-measurement-delete.component.scss"]
})
export class UnitOfMeasurementDeleteComponent implements  OnInit{

  public deleteExecutor: DeleteExecutor<UnitOfMeasurementDto>;

  constructor(private route: ActivatedRoute,
              private rest: UnitOfMeasurementWithArticlesDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<UnitOfMeasurementDto>(this.route, this.rest, "Die Masseinheit");
    this.deleteExecutor.registerCheck(unit => unit.articles.length > 0,
      uint => `weil sie noch in ${uint.articles.length} Artikel(n) verwendet wird.`);
    this.deleteExecutor.initDelete();
  }
}
