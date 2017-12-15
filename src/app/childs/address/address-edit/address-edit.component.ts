import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IAddress} from "citrus-common";
import {AddressTO} from "../../../TransferObjects/AddressTO";
import {AddressDatabaseService} from "../address-database.service";

@Component({
  selector: "app-address-edit",
  templateUrl: "./address-edit.component.html",
  styleUrls: ["./address-edit.component.scss"]
})
export class AddressEditComponent implements OnInit {

  public address: IAddress = AddressTO.createEmpty();
  public addressID: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public addressDatabase: AddressDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.address = AddressTO.createEmpty();
        this.addressID = this.address.id;
      } else {
        this.addressDatabase.get(+params["id"])
          .subscribe(
            t => {
              this.address = AddressTO.createAddressWithId(t.id, t);
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
      this.addressDatabase.add(new AddressTO(this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save address: ${this.address.id} with Error: ${err}`)
        );
    } else {
      this.addressDatabase.update(AddressTO.createAddressWithId(this.addressID, this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update address: ${this.address.id} with Error: ${err}`));
    }
  }
}
