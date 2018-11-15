import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto, OpeningHourDto} from "citrus-common";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {BehaviorSubject, combineLatest} from "rxjs";
import {LocationWithOpeninghHoursDtoRestService} from "../../location/location-with-openingh-hours-dto-rest.service";
import {OrderDtoWithAllRestService} from "../order-dto-with-all-rest.service";

@Component({
  selector: "app-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.scss"]
})
export class OrderEditComponent implements OnInit {

  public order = OrderDto.createEmpty();
  public orderId: number;

  public locationSubject: BehaviorSubject<LocationDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderRest: OrderDtoWithAllRestService,
              public locationRest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    const url = this.removeNamedOutletPart(this.router.routerState.snapshot.url);
    this.router.navigate([url, {outlets: {"details": ["orderItem"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.orderId = this.order.id;
        this.locationRest.getAll().subscribe(locations => this.locationSubject.next(locations));
      } else {
        combineLatest(this.orderRest.get(+params["id"]),
          this.locationRest.getAll()
        ).subscribe(
          result => {
            this.order = this.resultProcessor(result);
            this.locationChange();
            this.orderId = this.order.id;
          },
          err => {
            console.log(`Could not get order with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  public locationChange() {
    this.ensureOpeningHourInOrder(this.order, this.order.location.openingHours);
  }

  private resultProcessor(result: any[]): OrderDto {
    const order: OrderDto = result[0];
    const locations: LocationDto[] = result[1];
    this.locationSubject.next(locations);
    this.ensureLocationInOrder(order, locations);
    return order;
  }

  private ensureLocationInOrder(order: OrderDto, locations: LocationDto[]): void {
    for (const location of locations) {
      if (this.isLocationWithSameId(order, location)) {
        order.location = location;
      }
    }
  }

  private ensureOpeningHourInOrder(order: OrderDto, openingHours: OpeningHourDto[]): void {
    for (const openingHour of openingHours) {
      if (this.isOpeningHourWithSameId(order, openingHour)) {
        order.plannedCheckout = openingHour;
      }
    }
  }

  private isLocationWithSameId(order: OrderDto, location: LocationDto): boolean {
    return order.location != null && order.location.id === location.id;
  }

  private isOpeningHourWithSameId(order: OrderDto, openingHour: OpeningHourDto): boolean {
    return order.plannedCheckout != null && order.plannedCheckout.id === openingHour.id;
  }

  public submit() {
    if (this.orderId == null) {
      this.orderRest.add(new OrderDto(this.order))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save order: ${this.order.id} with Error: ${err}`)
        );
    } else {
      this.orderRest.update(OrderDto.createWithId(this.orderId, this.order))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update order: ${this.order.id} with Error: ${err}`));
    }
  }

  public tabChange(event: MatTabChangeEvent) {
    const url = this.removeNamedOutletPart(this.router.routerState.snapshot.url);
    if (event.index === 0) {
      this.router.navigate([url, {outlets: {"details": ["orderItem"]}}]);

    } else if (event.index === 1) {
      this.router.navigate([url, {outlets: {"details": ["checkedOutOrderItem"]}}]);
    }
  }

  private removeNamedOutletPart(url: string): string {
    const braketPos = url.indexOf("(");
    if (braketPos >= 0) {
      return url.substring(0, braketPos);
    }
    return url;
  }
}
