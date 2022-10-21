import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
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
  firstFormGroup: UntypedFormGroup;
  firstCtrl: UntypedFormControl;
  secondFormGroup: UntypedFormGroup;
  state = "emptyCart";
  orderNumber: number;
  error: string;
  selectedCart: CartDto = new CartDto(LocationDto.createEmpty(), 0, "");
  commentFormGroup: UntypedFormGroup;
  commentCtrl: UntypedFormControl;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              private cartRestService: CartRestService,
              private _formBuilder: UntypedFormBuilder,
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
            const openingHour = this.getValidOpeningHour();
            this.cartService.updatePlannedCheckout(this.selectedCart.location.id, openingHour);
            this.firstFormGroup.get("firstCtrl").setValue(openingHour);
            this.commentFormGroup.get("commentCtrl").setValue(this.selectedCart.comment);
          });
        }
      }
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new UntypedFormControl([null]),
    });
    this.firstFormGroup.get("firstCtrl").valueChanges.subscribe(value => {
      this.cartService.updatePlannedCheckout(this.selectedCart.location.id, value);
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [""]
    });
    this.commentFormGroup = this._formBuilder.group({
      commentCtrl: new UntypedFormControl([null]),
    });
    this.commentFormGroup.get("commentCtrl").valueChanges.subscribe(value => {
      this.cartService.updateComment(this.selectedCart.location.id, value);
    });
  }

  private getValidOpeningHour() {
    if (this.selectedCart.openingHourOfPlannedCheckout) {
      for (const openingHour of this.selectedCart.location.openingHours) {
        if (this.selectedCart.openingHourOfPlannedCheckout.id === openingHour.id) {
          return openingHour;
        }
      }
    }
    this.selectedCart.openingHourOfPlannedCheckout = null;
  }

  back() {
    this.router.navigate(["../.."], {relativeTo: this.route});
  }

  public finished() {
    this.state = "saving";
    this.orderCart(this.selectedCart);
  }

  private orderCart(cart: CartDto) {
    this.cartRestService.add(cart).subscribe(order => {
        this.orderNumber = order.id;
        this.state = "finished";
        this.cartService.clearCart(this.selectedCart.location.id);
      },
      (err: HttpErrorResponse) => {
        this.error = "Fehler: " + err.message;
        this.state = "error";
      });
  }
}
