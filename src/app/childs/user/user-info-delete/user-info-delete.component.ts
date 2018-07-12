import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {UserInfoWithAllDtoRestService} from "../user-info-with-all-dto-rest.service";

@Component({
  selector: "app-user-info-delete",
  templateUrl: "./user-info-delete.component.html",
  styleUrls: ["./user-info-delete.component.scss"]
})
export class UserInfoDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<UserInfoDto>;

  constructor(private route: ActivatedRoute,
              private rest: UserInfoWithAllDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<UserInfoDto>(this.route, this.rest, "Der Benutzer");
    this.deleteExecutor.registerCheck(userInfo => userInfo.customerOrders.length > 0,
      userInfo => `weil er noch ${userInfo.customerOrders.length} Bestellung(en) hat`);
    this.deleteExecutor.registerCheck(userInfo => userInfo.addresses.length > 0,
      userInfo => `weil er noch ${userInfo.addresses.length} Addresse(n) hat`);
    this.deleteExecutor.initDelete();
  }
}
