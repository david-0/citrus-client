import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserInfoDto} from "citrus-common";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {UserInfoDtoRestService} from "../user-info-dto-rest.service";

@Component({
  selector: "app-user-info-delete",
  templateUrl: "./user-info-delete.component.html",
  styleUrls: ["./user-info-delete.component.scss"]
})
export class UserInfoDeleteComponent extends BaseDeleteComponent<UserInfoDto> {

  constructor(route: ActivatedRoute,
              rest: UserInfoDtoRestService) {
    super(route, rest, "Der Benutzer");
  }
}
