import {Component, Input, ViewChild} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: RoleDtoRestService, settings: RoleSettingsService) {
    super(rest, settings);
  }

}
