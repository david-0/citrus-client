import {Component, Input, OnInit} from "@angular/core";
import {LocationDto} from "citrus-common";

@Component({
  selector: "app-location-detail-only",
  templateUrl: "./location-detail-only.component.html",
  styleUrls: ["./location-detail-only.component.scss"]
})
export class LocationDetailOnlyComponent implements OnInit {

  constructor() {
  }

  @Input() pickupLocation: LocationDto;

  ngOnInit() {
  }

}
