import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto, UserDto} from "citrus-common";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {BehaviorSubject, combineLatest} from "rxjs";
import {LocationDtoRestService} from "../../location/location-dto-rest.service";
import {UserDtoRestService} from "../../user/user-dto-rest.service";
import {OrderWithItemsAndArticleDtoRestService} from "../order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-edit",
  templateUrl: "./customer-order-edit.component.html",
  styleUrls: ["./customer-order-edit.component.scss"]
})
export class CustomerOrderEditComponent implements OnInit {

  public order = OrderDto.createEmpty();
  public orderId: number;

  public userSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);
  public locationSubject: BehaviorSubject<LocationDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderRest: OrderWithItemsAndArticleDtoRestService,
              public userRest: UserDtoRestService,
              public locationRest: LocationDtoRestService) {
  }

  ngOnInit() {
    this.router.navigate([this.router.routerState.snapshot.url, {outlets: {"customerOrderItem": ["orderItem"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.orderId = this.order.id;
        this.userRest.getAll().subscribe(users => this.userSubject.next(users));
        this.locationRest.getAll().subscribe(locations => this.locationSubject.next(locations));
      } else {
        combineLatest(this.orderRest.get(+params["id"]),
          this.userRest.getAll(),
          this.locationRest.getAll()
        ).subscribe(
          result => {
            this.order = this.resultProcessor(result);
            this.orderId = this.order.id;
          },
          err => {
            console.log(`Could not get customerOrder with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private resultProcessor(result: any[]): OrderDto {
    const customerOrder: OrderDto = result[0];
    const users: UserDto[] = result[1];
    const locations: LocationDto[] = result[2];
    this.userSubject.next(users);
    this.locationSubject.next(locations);
    this.ensureUserInfoInCustomerOrder(customerOrder, users);
    // this.ensureLocationInCustomerOrder(order, locations);
    return customerOrder;
  }

  private ensureUserInfoInCustomerOrder(customerOrder: OrderDto, users: UserDto[]): void {
    for (const user of users) {
      if (this.isUserWithSameId(customerOrder, user)) {
        customerOrder.user = user;
      }
    }
  }

  private isUserWithSameId(customerOrder: OrderDto, user: UserDto): boolean {
    return customerOrder.user != null && customerOrder.user.id === user.id;
  }

  // private ensureLocationInCustomerOrder(order: CustomerOrderDto, locations: LocationDto[]): void {
  //   for (const location of locations) {
  //     if (this.isLocationWithSameId(order, location)) {
  //       order.location = location;
  //     }
  //   }
  // }

  private isLocationWithSameId(customerOrder: OrderDto, location: LocationDto): boolean {
    return customerOrder.user != null && customerOrder.user.id === location.id;
  }

  public submit() {
    if (this.orderId == null) {
      this.orderRest.add(new OrderDto(this.order))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save customerOrder: ${this.order.id} with Error: ${err}`)
        );
    } else {
      this.orderRest.update(OrderDto.createWithId(this.orderId, this.order))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update customerOrder: ${this.order.id} with Error: ${err}`));
    }
  }
}
