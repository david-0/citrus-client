import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto, LocationDto, OpeningHourDto, UserDto} from "citrus-common";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {LocationWithOpeninghHoursDtoRestService} from "../../location/location-with-openingh-hours-dto-rest.service";
import {UserDtoRestService} from "../../user/user-dto-rest.service";
import {OrderDtoWithAllRestService} from "../order-dto-with-all-rest.service";

@Component({
  selector: "app-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.scss"]
})
export class OrderEditComponent implements OnInit {

  public order = OrderDto.createEmpty();
  public orderId: number;
  public orderDate: Date;

  public locationSubject: BehaviorSubject<LocationDto[]> = new BehaviorSubject([]);
  public userInfoSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);


  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderRest: OrderDtoWithAllRestService,
              private userRest: UserDtoRestService,
              private locationRest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    const url = this.removeNamedOutletPart(this.router.routerState.snapshot.url);
    this.router.navigate([url, {outlets: {"details": ["orderItem"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.orderId = this.order.id;
        this.order.date = new Date();
        this.orderDate = this.order.date;
        this.locationRest.getAll().subscribe(locations => this.locationSubject.next(locations.sort((n1, n2) => n1.city.localeCompare(n2.city))));
        this.userRest.getAll().subscribe(users => this.userInfoSubject.next(users.sort((n1, n2) => n1.name.localeCompare(n2.name))));
      } else {
        combineLatest(this.orderRest.get(+params["id"]),
          this.locationRest.getAll(), this.userRest.getAll()
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
    const user: UserDto[] = result[2];
    this.locationSubject.next(locations);
    this.ensureLocationInOrder(order, locations);
    this.ensureUserInOrder(order, user);
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

  private ensureUserInOrder(order: OrderDto, users: UserDto[]): OrderDto {
    this.userInfoSubject.next(users);
    for (const user of users) {
      if (this.isUserWithSameId(order, user)) {
        order.user = user;
      }
    }
    return order;
  }

  private isLocationWithSameId(order: OrderDto, location: LocationDto): boolean {
    return order.location != null && order.location.id === location.id;
  }

  private isOpeningHourWithSameId(order: OrderDto, openingHour: OpeningHourDto): boolean {
    return order.plannedCheckout != null && order.plannedCheckout.id === openingHour.id;
  }

  private isUserWithSameId(order: OrderDto, user: UserDto): boolean {
    return order.user != null && order.user.id === user.id;
  }

  public submit() {
    const orderCopy = OrderDto.createEmpty();
    orderCopy.user = this.order.user;
    orderCopy.comment = this.order.comment;
    orderCopy.plannedCheckout = this.order.plannedCheckout;
    orderCopy.location = this.order.location;
    orderCopy.orderItems = this.order.orderItems;
     
    if (this.orderId == null) {
      orderCopy.date = this.orderDate;
      this.orderRest.add(new OrderDto(orderCopy))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save order: ${this.order.id} with Error: ${err}`)
        );
    } else {
      orderCopy.id = this.orderId;
      orderCopy.date = this.order.date;
      this.orderRest.update(OrderDto.createWithId(this.orderId, orderCopy))
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
