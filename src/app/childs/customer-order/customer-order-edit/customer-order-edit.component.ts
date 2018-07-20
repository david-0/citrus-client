import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {BehaviorSubject, combineLatest} from "rxjs";
import {PickupLocationDtoRestService} from "../../pickup-location/pickup-location-dto-rest.service";
import {UserInfoDtoRestService} from "../../user/user-info-dto-rest.service";
import {CustomerOrderWithItemsAndArticleDtoRestService} from "../customer-order-with-items-and-article-dto-rest.service";

@Component({
  selector: "app-customer-order-edit",
  templateUrl: "./customer-order-edit.component.html",
  styleUrls: ["./customer-order-edit.component.scss"]
})
export class CustomerOrderEditComponent implements OnInit {

  public customerOrder = CustomerOrderDto.createEmpty();
  public customerOrderID: number;

  public userInfoSubject: BehaviorSubject<UserInfoDto[]> = new BehaviorSubject([]);
  public pickupLocationSubject: BehaviorSubject<PickupLocationDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerOrderRest: CustomerOrderWithItemsAndArticleDtoRestService,
              public userInfoRest: UserInfoDtoRestService,
              public pickupLocationRest: PickupLocationDtoRestService) {
  }

  ngOnInit() {
    this.router.navigate([this.router.routerState.snapshot.url, {outlets: {"customerOrderItem": ["customerOrderItem"]}}]);
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.customerOrderID = this.customerOrder.id;
        this.userInfoRest.getAll().subscribe(userInfos => this.userInfoSubject.next(userInfos));
        this.pickupLocationRest.getAll().subscribe(locations => this.pickupLocationSubject.next(locations));
      } else {
        combineLatest(this.customerOrderRest.get(+params["id"]),
          this.userInfoRest.getAll(),
          this.pickupLocationRest.getAll()
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
    const userInfos: UserInfoDto[] = result[1];
    const locations: PickupLocationDto[] = result[2];
    this.userInfoSubject.next(userInfos);
    this.pickupLocationSubject.next(locations);
    this.ensureUserInfoInCustomerOrder(customerOrder, userInfos);
    this.ensurePickupLocationInCustomerOrder(customerOrder, locations);
    return customerOrder;
  }

  private ensureUserInfoInCustomerOrder(customerOrder: CustomerOrderDto, userInfos: UserInfoDto[]): void {
    for (const userInfo of userInfos) {
      if (this.isUserInfoWithSameId(customerOrder, userInfo)) {
        customerOrder.user = userInfo;
      }
    }
  }

  private isUserInfoWithSameId(customerOrder: CustomerOrderDto, userInfo: UserInfoDto): boolean {
    return (customerOrder.userId === userInfo.id) ||
      (customerOrder.user != null && customerOrder.user.id === userInfo.id);
  }

  private ensurePickupLocationInCustomerOrder(customerOrder: CustomerOrderDto, pickupLocations: PickupLocationDto[]): void {
    for (const pickupLocation of pickupLocations) {
      if (this.isPickupLocationWithSameId(customerOrder, pickupLocation)) {
        customerOrder.pickupLocation = pickupLocation;
      }
    }
  }

  private isPickupLocationWithSameId(customerOrder: CustomerOrderDto, pickupLocation: PickupLocationDto): boolean {
    return (customerOrder.pickupLocationId === pickupLocation.id) ||
      (customerOrder.user != null && customerOrder.user.id === pickupLocation.id);
  }

  public submit() {
    this.customerOrder.userId = this.customerOrder.user.id;
    this.customerOrder.pickupLocationId = this.customerOrder.pickupLocation.id;
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
