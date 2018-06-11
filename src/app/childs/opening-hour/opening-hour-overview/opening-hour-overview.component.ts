import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto} from "citrus-common";
import {Observable} from "rxjs/Observable";
import {AddressDtoRestService} from "../../address/address-dto-rest.service";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../../pickup-location/pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-opening-hour-overview",
  templateUrl: "./opening-hour-overview.component.html",
  styleUrls: ["./opening-hour-overview.component.scss"]
})
export class OpeningHourOverviewComponent implements OnInit {

  public id: number;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      if (params["id"] !== null) {
        this.id = +params["id"];
      }
    });

  }

}
