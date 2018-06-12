import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {PickupLocationWithOpeninghHoursDtoRestService} from "../childs/pickup-location/pickup-location-with-openingh-hours-dto-rest.service";

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

  constructor(private _formBuilder: FormBuilder,
              private pickupLocationRest: PickupLocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    this.firstCtrl = new FormControl(["", Validators.required]);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: this.firstCtrl
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });

    this.firstCtrl.valueChanges.subscribe(value => {
      this.selectedLocation = value;
    });

    this.pickupLocationRest.getAll().subscribe(locations => {
      this.locations = locations;
    });
  }
}
