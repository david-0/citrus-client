import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {UserWithAllDtoRestService} from "../user-with-all-dto-rest.service";

@Component({
  selector: "app-user-info-delete",
  templateUrl: "./user-delete.component.html",
  styleUrls: ["./user-delete.component.scss"]
})
export class UserInfoDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<UserDto>;

  constructor(private route: ActivatedRoute,
              private rest: UserWithAllDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<UserDto>(this.route, this.rest, "Der Benutzer");
    this.deleteExecutor.registerCheck(userInfo => userInfo.orders.length > 0,
      userInfo => `weil er noch ${userInfo.orders.length} Bestellung(en) hat`);
    this.deleteExecutor.initDelete();
  }
}
