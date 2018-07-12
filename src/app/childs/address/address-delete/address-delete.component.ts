import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AddressDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {AddressDtoRestService} from "../address-dto-rest.service";

@Component({
  selector: "app-address-delete",
  templateUrl: "./address-delete.component.html",
  styleUrls: ["./address-delete.component.scss"]
})
export class AddressDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<AddressDto>;

  constructor(private route: ActivatedRoute,
              private rest: AddressDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<AddressDto>(this.route, this.rest, "Die Adresse");
    this.deleteExecutor.initDelete();
  }
}
