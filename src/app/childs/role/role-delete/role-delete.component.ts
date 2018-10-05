import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {DeleteExecutor} from "../../../base/delete-executor";
import {RoleWithUsersDtoRestService} from "../role-with-users-dto-rest.service";

@Component({
  selector: "app-role-delete",
  templateUrl: "./role-delete.component.html",
  styleUrls: ["./role-delete.component.scss"]
})
export class RoleDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<RoleDto>;

  constructor(private route: ActivatedRoute,
              private rest: RoleWithUsersDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<RoleDto>(this.route, this.rest, "Die Role");
    this.deleteExecutor.registerCheck(role => role.users.length > 0,
      role => `weil sie noch von ${role.users.length} Benutzer(n) verwendet wird`);
    this.deleteExecutor.initDelete();
  }
}

