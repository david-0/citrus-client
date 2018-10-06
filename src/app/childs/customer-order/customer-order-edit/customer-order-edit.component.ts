import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto, UserDto} from "citrus-common";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {BehaviorSubject, combineLatest} from "rxjs";
import {LocationDtoRestService} from "../../location/location-dto-rest.service";
import {UserDtoRestService} from "../../user/user-dto-rest.service";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../customer-order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-edit",
  templateUrl: "./customer-order-edit.component.html",
  styleUrls: ["./customer-order-edit.component.scss"]
})
export class CustomerOrderEditComponent implements OnInit {

  public customerOrder = CustomerOrderDto.createEmpty();
  public customerOrderID: number;

  public userSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);
  public locationSubject: BehaviorSubject<LocationDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerOrderRest: CustomerOrderWithItemsAndArticleDtoRestService,
              public userRest: UserDtoRestService,
              public locationRest: LocationDtoRestService) {
  }

  ngOnInit() {
    this.router.navigate([this.router.routerState.snapshot.url, {outlets: {"customerOrderItem": ["customerOrderItem"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.customerOrderID = this.customerOrder.id;
        this.userRest.getAll().subscribe(users => this.userSubject.next(users));
        this.locationRest.getAll().subscribe(locations => this.locationSubject.next(locations));
      } else {
        combineLatest(this.customerOrderRest.get(+params["id"]),
          this.userRest.getAll(),
          this.locationRest.getAll()
        ).subscribe(
          result => {
            this.customerOrder = this.resultProcessor(result);
            this.customerOrderID = this.customerOrder.id;
          },
          err => {
            console.log(`Could not get customerOrder with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private resultProcessor(result: any[]): CustomerOrderDto {
    const customerOrder: CustomerOrderDto = result[0];
    const users: UserDto[] = result[1];
    const locations: LocationDto[] = result[2];
    this.userSubject.next(users);
    this.locationSubject.next(locations);
    this.ensureUserInfoInCustomerOrder(customerOrder, users);
    // this.ensureLocationInCustomerOrder(customerOrder, locations);
    return customerOrder;
  }

  private ensureUserInfoInCustomerOrder(customerOrder: CustomerOrderDto, users: UserDto[]): void {
    for (const user of users) {
      if (this.isUserWithSameId(customerOrder, user)) {
        customerOrder.user = user;
      }
    }
  }

  private isUserWithSameId(customerOrder: CustomerOrderDto, user: UserDto): boolean {
    return customerOrder.user != null && customerOrder.user.id === user.id;
  }

  // private ensureLocationInCustomerOrder(customerOrder: CustomerOrderDto, locations: LocationDto[]): void {
  //   for (const location of locations) {
  //     if (this.isLocationWithSameId(customerOrder, location)) {
  //       customerOrder.location = location;
  //     }
  //   }
  // }

  private isLocationWithSameId(customerOrder: CustomerOrderDto, location: LocationDto): boolean {
    return customerOrder.user != null && customerOrder.user.id === location.id;
  }

  public submit() {
    if (this.customerOrderID == null) {
      this.customerOrderRest.add(new CustomerOrderDto(this.customerOrder))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save customerOrder: ${this.customerOrder.id} with Error: ${err}`)
        );
    } else {
      this.customerOrderRest.update(CustomerOrderDto.createWithId(this.customerOrderID, this.customerOrder))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update customerOrder: ${this.customerOrder.id} with Error: ${err}`));
    }
  }
}
