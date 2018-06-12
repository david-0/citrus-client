import {Component, Input, OnInit} from "@angular/core";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";

@Component({
  selector: "app-pickup-location-detail-only",
  templateUrl: "./pickup-location-detail-only.component.html",
  styleUrls: ["./pickup-location-detail-only.component.scss"]
})
export class PickupLocationDetailOnlyComponent implements OnInit {

  constructor() {
  }

  @Input() pickupLocation: PickupLocationDto;

  ngOnInit() {
  }

}
