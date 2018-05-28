import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

@Component({
  selector: "app-unit-of-measurement-edit",
  templateUrl: "./unit-of-measurement-edit.component.html",
  styleUrls: ["./unit-of-measurement-edit.component.scss"]
})
export class UnitOfMeasurementEditComponent implements OnInit {

  public unitOfMeasurement: UnitOfMeasurementDto = UnitOfMeasurementDto.createEmpty();
  public unitOfMeasurementId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public rest: UnitOfMeasurementDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.unitOfMeasurement = UnitOfMeasurementDto.createEmpty();
        this.unitOfMeasurementId = this.unitOfMeasurement.id;
      } else {
        this.rest.get(+params["id"])
          .subscribe(
            t => {
              this.unitOfMeasurement = UnitOfMeasurementDto.createWithId(t.id, t);
              this.unitOfMeasurementId = this.unitOfMeasurement.id;
            },
            err => {
              console.log(`Could not get address with id ${params["id"]} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.unitOfMeasurementId == null) {
      this.rest.add(new UnitOfMeasurementDto(this.unitOfMeasurement))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save unitOfMeasurement: ${this.unitOfMeasurement.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(UnitOfMeasurementDto.createWithId(this.unitOfMeasurementId, this.unitOfMeasurement))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update unitOfMeasurement: ${this.unitOfMeasurement.id} with Error: ${err}`));
    }
  }
}
