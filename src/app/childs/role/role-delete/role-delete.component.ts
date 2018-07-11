import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {RoleWithUsersDtoRestService} from "../role-with-users-dto-rest.service";

@Component({
  selector: "app-role-delete",
  templateUrl: "./role-delete.component.html",
  styleUrls: ["./role-delete.component.scss"]
})
export class RoleDeleteComponent extends BaseDeleteComponent<RoleDto> {

  constructor(route: ActivatedRoute,
              rest: RoleWithUsersDtoRestService) {
    super(route, rest, "Role");
    this.registerCheckEmpty(role => role.users.length > 0,
      "Die Role wurde nicht gelöscht, da sie noch verwendet wird.");
  }
}

