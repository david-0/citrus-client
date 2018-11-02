import {Component, OnInit} from "@angular/core";
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
  public currentLocation: LocationDto = null;

  constructor(private rest: LocationDtoRestService, private saleLocation: SaleLocationService) {
  }

  ngOnInit() {
    this.rest.getAll().subscribe(locations => {
      this._locations = locations;
      this.currentLocation = this.checkValidLocation(this.saleLocation.getSaleLocation());
      if (this.currentLocation === null) {
        this.saleLocation.clearSaleLocation();
      }
    });
  }

  public get locations() {
    return this._locations;
  }

  public updateLocation() {
    this.saleLocation.setSaleLocation(this.currentLocation);
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
