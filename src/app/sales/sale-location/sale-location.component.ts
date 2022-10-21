import {Component, OnInit} from "@angular/core";
import {UntypedFormControl} from "@angular/forms";
import {LocationDto} from "citrus-common";
import {LocationDtoRestService} from "../../childs/location/location-dto-rest.service";
import {SaleLocationService} from "../sale-location.service";

@Component({
  selector: "app-sale-location",
  templateUrl: "./sale-location.component.html",
  styleUrls: ["./sale-location.component.scss"]
})
export class SaleLocationComponent implements OnInit {

  private _locations: LocationDto[] = [];
  public saleLocation: UntypedFormControl;

  constructor(private rest: LocationDtoRestService, private saleLocationService: SaleLocationService) {
  }

  ngOnInit() {
    this.saleLocation = new UntypedFormControl();
    this.saleLocation.valueChanges.subscribe(value => {
      this.saleLocationService.setSaleLocation(value);
    });
    this.rest.getAll().subscribe(locations => {
      this._locations = locations;
      const checkedLocation = this.checkValidLocation(this.saleLocationService.getSaleLocation().getValue());
      this.saleLocation.setValue(checkedLocation);
    });
  }

  public get locations() {
    return this._locations;
  }

  private checkValidLocation(currentLocation: LocationDto): LocationDto {
    if (currentLocation) {
      for (const location of this.locations) {
        if (location && location.id === currentLocation.id) {
          return location;
        }
      }
    }
    return null;
  }
}
