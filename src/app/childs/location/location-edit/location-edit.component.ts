import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto, LocationDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {AddressDtoRestService} from "../../address/address-dto-rest.service";
import {LocationWithOpeninghHoursDtoRestService} from "../location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-location-edit",
  templateUrl: "./location-edit.component.html",
  styleUrls: ["./location-edit.component.scss"]
})
export class LocationEditComponent implements OnInit {
  public location = LocationDto.createEmpty();
  public locationId: number;

  public addressSubject: BehaviorSubject<AddressDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: LocationWithOpeninghHoursDtoRestService,
              public addressRest: AddressDtoRestService) {
  }

  ngOnInit() {
    this.router.navigate([this.router.routerState.snapshot.url, {outlets: {"opening-hour": ["opening-hour"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.locationId = this.location.id;
        this.addressRest.getAll().subscribe(addresses => this.addressSubject.next(addresses));
      } else {
        const addressObservable: Observable<AddressDto[]> = this.addressRest.getAll();
        const locationObservable = this.rest.get(+params["id"]);
        combineLatest(locationObservable, addressObservable).subscribe(
          result => {
            // this.location = this.ensureAddressInLocation(result[0], result[1]);
            this.locationId = this.location.id;
          },
          err => {
            console.log(`Could not get location with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  public submit() {
    if (this.locationId == null) {
      this.rest.add(new LocationDto(this.location))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save location: ${this.location.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(LocationDto.createWithId(this.locationId, this.location))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update location: ${this.location.id} with Error: ${err}`));
    }
  }
}
