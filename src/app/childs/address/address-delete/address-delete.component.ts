import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AddressRestService} from "../address-rest.service";

@Component({
  selector: "app-address-delete",
  templateUrl: "./address-delete.component.html",
  styleUrls: ["./address-delete.component.scss"]
})
export class AddressDeleteComponent implements OnInit {

  public id: string;
  public message: string;

  constructor(private route: ActivatedRoute,
              public addressDatabase: AddressRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.addressDatabase.remove(+params["id"])
        .subscribe(
          t => {
            this.message = `Die Adresse wurde gelöscht!`;
          },
          err => {
            this.message = `Die Adresse konnte nicht gelöscht werden (Error: ${err}).`;
          });
    });
  }
}
