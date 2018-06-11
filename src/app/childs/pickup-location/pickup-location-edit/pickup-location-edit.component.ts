import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto} from "citrus-common";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AddressDtoRestService} from "../../address/address-dto-rest.service";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-pickup-location-edit",
  templateUrl: "./pickup-location-edit.component.html",
  styleUrls: ["./pickup-location-edit.component.scss"]
})
export class PickupLocationEditComponent implements OnInit {
  public pickupLocation = PickupLocationDto.createEmpty();
  public pickupLocationID: number;

  public addressSubject: BehaviorSubject<AddressDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: PickupLocationWithOpeninghHoursDtoRestService,
              public addressRest: AddressDtoRestService) {
  }

  ngOnInit() {
    this.router.navigate([this.router.routerState.snapshot.url, {outlets: {"opening-hour": ["opening-hour"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.pickupLocationID = this.pickupLocation.id;
        const addressObservable: Observable<AddressDto[]> = this.addressRest.getAll();
        addressObservable.subscribe(addresses => {
          this.addressSubject.next(addresses);
        });
      } else {
        const addressObservable: Observable<AddressDto[]> = this.addressRest.getAll();
        const pickupLocationObservable = this.rest.get(+params["id"]);
        Observable.combineLatest(pickupLocationObservable, addressObservable, (p, addresses) => {
          return this.ensureAddressInPickupLocation(p, addresses);
        }).subscribe(
          t => {
            this.pickupLocation = t;
            this.pickupLocationID = this.pickupLocation.id;
          },
          err => {
            console.log(`Could not get pickupLocation with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private ensureAddressInPickupLocation(pickupLocation, addresses): PickupLocationDto {
    this.addressSubject.next(addresses);
    for (const address of addresses) {
      if (this.isAddressWithSameId(pickupLocation, address)) {
        pickupLocation.address = address;
      }
    }
    return pickupLocation;
  }

  private isAddressWithSameId(pickupLocation: PickupLocationDto, address: AddressDto): boolean {
    return (pickupLocation.addressId === address.id) ||
      (pickupLocation.address != null && pickupLocation.address.id === address.id);
  }

  public submit() {
    this.pickupLocation.addressId = this.pickupLocation.address.id;
    if (this.pickupLocationID == null) {
      this.rest.add(new PickupLocationDto(this.pickupLocation))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save pickupLocation: ${this.pickupLocation.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(PickupLocationDto.createWithId(this.pickupLocationID, this.pickupLocation))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update pickupLocation: ${this.pickupLocation.id} with Error: ${err}`));
    }
  }
}
