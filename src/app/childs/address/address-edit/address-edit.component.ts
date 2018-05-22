import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto} from "citrus-common";
import {UserInfoDatabaseService} from "../../user/user-info-database.service";
import {AddressDatabaseService} from "../address-database.service";

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
              public addressDatabase: AddressDatabaseService,
              public userDatabase: UserInfoDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.address = AddressDto.createEmpty();
        this.addressID = this.address.id;
      } else {
        this.addressDatabase.get(+params["id"])
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
      this.addressDatabase.add(new AddressDto(this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save address: ${this.address.id} with Error: ${err}`)
        );
    } else {
      this.addressDatabase.update(AddressDto.createAddressWithId(this.addressID, this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update address: ${this.address.id} with Error: ${err}`));
    }
  }
}
