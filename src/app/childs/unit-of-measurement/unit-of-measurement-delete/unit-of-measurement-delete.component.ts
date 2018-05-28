import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

@Component({
  selector: "app-unit-of-measurement-delete",
  templateUrl: "./unit-of-measurement-delete.component.html",
  styleUrls: ["./unit-of-measurement-delete.component.scss"]
})
export class UnitOfMeasurementDeleteComponent implements OnInit {

  public id: string;
  public message: string;

  constructor(private route: ActivatedRoute,
              public rest: UnitOfMeasurementDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.del(+params["id"])
        .subscribe(
          t => {
            this.message = `Die Masseinheit wurde gelöscht!`;
          },
          err => {
            this.message = `Die Masseinheit konnte nicht gelöscht werden (Error: ${err}).`;
          });
    });
  }

}
