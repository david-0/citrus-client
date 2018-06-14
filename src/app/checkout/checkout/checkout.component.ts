import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {CartService} from "../../cart/cart.service";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../../childs/pickup-location/pickup-location-with-openingh-hours-dto-rest.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  firstCtrl: FormControl;
  secondFormGroup: FormGroup;
  selectedLocation: PickupLocationDto;
  locations: PickupLocationDto[];
  state = "emptyCart";

  constructor(private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              private _formBuilder: FormBuilder,
              private pickupLocationRest: PickupLocationWithOpeninghHoursDtoRestService) {
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
      }
    });
  }

  back() {
    this.router.navigate([".."], {relativeTo: this.route});
  }

  public finished() {
    console.log("finished");
    this.state = "finished";
  }
}
