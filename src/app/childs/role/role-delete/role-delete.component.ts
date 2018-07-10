import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {RoleDtoRestService} from "../../user/role-dto-rest.service";

@Component({
  selector: "app-role-delete",
  templateUrl: "./role-delete.component.html",
  styleUrls: ["./role-delete.component.scss"]
})
export class RoleDeleteComponent extends BaseDeleteComponent<RoleDto> {

  constructor(route: ActivatedRoute,
              rest: RoleDtoRestService) {
    super(route, rest, "Role");
  }
}

