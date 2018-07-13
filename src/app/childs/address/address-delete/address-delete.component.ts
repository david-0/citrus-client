import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AddressDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {AddressWithAllDtoRestService} from "../address-with-all-dto-rest.service";

@Component({
  selector: "app-address-delete",
  templateUrl: "./address-delete.component.html",
  styleUrls: ["./address-delete.component.scss"]
})
export class AddressDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<AddressDto>;

  constructor(private route: ActivatedRoute,
              private rest: AddressWithAllDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<AddressDto>(this.route, this.rest, "Die Adresse");
    this.deleteExecutor.registerCheck(address => address.pickupLocations.length > 0,
      address => `weil sie noch ${address.pickupLocations.length} Abholstation(en) verwendet wird.`);
    this.deleteExecutor.initDelete();
  }
}
