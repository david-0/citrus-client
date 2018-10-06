import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto} from "citrus-common";
import {CartDto} from "citrus-common/lib/dto/cart-dto";
import {CartEntryDto} from "citrus-common/lib/dto/cart-entry-dto";
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
  currentCartEntries = [];
  error: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              private cartRestService: CartRestService,
              private _formBuilder: FormBuilder,
              private pickupLocationRest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl(["", [Validators.required, Validators.minLength(4)]]),
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.firstFormGroup.get("firstCtrl").valueChanges.subscribe(value => {
      this.selectedLocation = value;
    });
    this.pickupLocationRest.getAll().subscribe(locations => {
      this.locations = locations;
    });
    this.cartService.getCart().subscribe(cart => {
      if (cart.length > 0) {
        this.state = "ongoing";
        this.currentCartEntries = cart;
      }
    });
  }

  back() {
    this.router.navigate([".."], {relativeTo: this.route});
  }

  public finished() {
    this.state = "saving";
    this.orderCart(this.currentCartEntries);
  }

  private orderCart(cartEntries: CartEntry[]) {
    const cartEntryDtos = cartEntries.map(entry => new CartEntryDto(entry.article.id, entry.count, entry.price));
    const requestCartDto = new CartDto(cartEntryDtos, this.selectedLocation.id);
    this.cartRestService.add(requestCartDto).subscribe(responseCartDto => {
        this.orderNumber = responseCartDto.id;
        this.state = "finished";
        this.cartService.clear();
      },
      (err: HttpErrorResponse) => {
        this.error = "Fehler: " + err.message;
        this.state = "error";
      });
  }
}
