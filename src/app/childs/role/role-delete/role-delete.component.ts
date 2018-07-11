import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {OpeningHourDtoRestService} from "../../opening-hour/opening-hour-dto-rest.service";
import {RoleWithUsersDtoRestService} from "../role-with-users-dto-rest.service";

@Component({
  selector: "app-role-delete",
  templateUrl: "./role-delete.component.html",
  styleUrls: ["./role-delete.component.scss"]
})
export class RoleDeleteComponent extends BaseDeleteComponent<RoleDto> implements OnInit {

  constructor(route: ActivatedRoute,
              rest: RoleWithUsersDtoRestService) {
    super(route, rest, "Role");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.get(+params["id"]).subscribe(role => {
        if (role.users.length > 0) {
          this.message = `Die Role wurde nicht gelöscht, da sie noch verwendet wird.`;
        } else {
          super.ngOnInit();
        }
      }, error => {
        this.message = `Die ${this.dtoName} konnte nicht gelöscht werden (Error: ${error.error}).`;
      });
    });
  }
}

