import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {Subscription} from "rxjs";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

@Component({
  selector: "app-unit-of-measurement-details",
  templateUrl: "./unit-of-measurement-details.component.html",
  styleUrls: ["./unit-of-measurement-details.component.scss"]
})
export class UnitOfMeasurementDetailsComponent implements OnInit {
  private _unitOfMeasurement: UnitOfMeasurementDto = UnitOfMeasurementDto.createEmpty();
  private subscription: Subscription;


  constructor(private route: ActivatedRoute, private rest: UnitOfMeasurementDtoRestService) {
  }

  public get unitOfMeasurement(): UnitOfMeasurementDto {
    return this._unitOfMeasurement;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const unitOfMeasurementPromise = this.rest.get(+params["id"]);
      this.subscription = unitOfMeasurementPromise.subscribe((unitOfMeasurement) => {
        this._unitOfMeasurement = unitOfMeasurement;
      });
    });
  }

}
