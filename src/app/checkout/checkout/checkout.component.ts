import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CartDto, LocationDto} from "citrus-common";
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
  state = "emptyCart";
  orderNumber: number;
  error: string;
  selectedCart: CartDto = new CartDto(LocationDto.createEmpty(), 0);


  constructor(private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              private cartRestService: CartRestService,
              private _formBuilder: FormBuilder,
              private locationRest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== null) {
        this.selectedCart = this.cartService.getCartAtLocation(+params["id"]);
        if (this.selectedCart.cartItems.length > 0) {
          this.state = "ongoing";
          this.locationRest.get(this.selectedCart.location.id).subscribe(location => {
            this.selectedCart.location = location;
          });
        }
      }
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl([null]),
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [""]
    });
    this.firstFormGroup.get("firstCtrl").setValue(null); // unbestimmt
  }

  back() {
    this.router.navigate(["../.."], {relativeTo: this.route});
  }

  public finished() {
    this.state = "saving";
    this.orderCart(this.selectedCart);
    this.cartService.clearCart(this.selectedCart.location.id);
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
