import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CartDto, LocationDto, OpeningHourDto} from "citrus-common";
import {CartItemDto} from "citrus-common/lib/dto/cart-item-dto";
import {CartLocationDto} from "citrus-common/lib/dto/cart-location-dto";
import {CartEntry} from "../../cart/cart-entry";
import {CartService} from "../../cart/cart.service";
import {LocationWithOpeninghHoursDtoRestService} from "../../childs/location/location-with-openingh-hours-dto-rest.service";
import {CartRestService} from "../cart-rest.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  firstCtrl: FormControl;
  secondFormGroup: FormGroup;
  selectedLocation: LocationDto;
  locations: LocationDto[];
  state = "emptyCart";
  orderNumber: number;
  preparedCart = new CartDto([], 0);
  error: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              private cartRestService: CartRestService,
              private _formBuilder: FormBuilder,
              private locationRest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl([null]),
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [""]
    });
    this.firstFormGroup.get("firstCtrl").setValue(null); // unbestimmt
    this.firstFormGroup.get("firstCtrl").valueChanges.subscribe(value => {
      this.selectedLocation = value;
    });
    this.locationRest.getAll().subscribe(locations => {
      this.locations = locations;
      this.cartService.getCart().subscribe(cart => {
        if (cart.length > 0) {
          this.state = "ongoing";
          this.preparedCart = this.prepareOrder(cart);
        }
      });
    });
  }

  back() {
    this.router.navigate([".."], {relativeTo: this.route});
  }

  public finished() {
    this.state = "saving";
    this.orderCart(this.preparedCart);
  }

  private prepareOrder(cartEntires: CartEntry[]): CartDto {
    let totalPrice = 0;
    const locationMap = new Map<LocationDto, CartEntry[]>();
    cartEntires.forEach(e => {
      const location = this.getLocationWithOpeningHours(e.articleStock.location.id);
      if (!locationMap.has(location)) {
        locationMap.set(location, []);
      }
      locationMap.get(location).push(e);
    });
    const cartLocations: CartLocationDto[] = [];
    locationMap.forEach((entriesAtSameLocation: CartEntry[], location: LocationDto) => {
      const cartLocation = new CartLocationDto(location);
      entriesAtSameLocation.forEach(e => {
        const cartItem = new CartItemDto(e.articleStock.article, e.count, e.price);
        totalPrice += +e.count * +e.price;
        cartLocation.cartItems.push(cartItem);
      });
      cartLocations.push(cartLocation);
    });
    return new CartDto(cartLocations, totalPrice);
  }

  public async getOpeningHours(locationId: number): Promise<OpeningHourDto[]> {
    return new Promise<OpeningHourDto[]>((resolve, reject) => {
      this.locationRest.get(locationId).subscribe(l => {
        resolve(l.openingHours);
      }, error => {
        reject(error);
      });
    });
  }

  private getLocationWithOpeningHours(locationId: number): LocationDto {
    return this.locations.filter(l => l.id === locationId)[0];
  }

  private orderCart(cart: CartDto) {
    this.cartRestService.add(cart).subscribe(order => {
        this.orderNumber = order.id;
        this.state = "finished";
        this.cartService.clear();
      },
      (err: HttpErrorResponse) => {
        this.error = "Fehler: " + err.message;
        this.state = "error";
      });
  }
}
