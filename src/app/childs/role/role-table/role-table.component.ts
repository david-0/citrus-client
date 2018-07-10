import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {BaseTableComponent} from "../../../base/base-table.component";
import {RoleDtoRestService} from "../../user/role-dto-rest.service";
import {RoleSettingsService} from "../role-settings.service";

@Component({
  selector: "app-role-table",
  templateUrl: "./role-table.component.html",
  styleUrls: ["./role-table.component.scss"]
})
export class RoleTableComponent extends BaseTableComponent<RoleDto> {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: RoleDtoRestService, settings: RoleSettingsService) {
    super(rest, settings);
  }

}
