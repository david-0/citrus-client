import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto} from "citrus-common";
import {AddressDtoRestService} from "../address-dto-rest.service";

@Component({
  selector: "app-address-edit",
  templateUrl: "./address-edit.component.html",
  styleUrls: ["./address-edit.component.scss"]
})
export class AddressEditComponent implements OnInit {

  public address: AddressDto = AddressDto.createEmpty();
  public addressID: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: AddressDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.address = AddressDto.createEmpty();
        this.addressID = this.address.id;
      } else {
        this.rest.get(+params["id"])
          .subscribe(
            t => {
              this.address = AddressDto.createAddressWithId(t.id, t);
              this.addressID = this.address.id;
            },
            err => {
              console.log(`Could not get address with id ${params["id"]} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.addressID == null) {
      this.rest.add(new AddressDto(this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save address: ${this.address.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(AddressDto.createAddressWithId(this.addressID, this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update address: ${this.address.id} with Error: ${err}`));
    }
  }
}
