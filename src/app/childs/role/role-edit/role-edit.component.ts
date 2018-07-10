import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitOfMeasurementDto} from "citrus-common";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {RoleDtoRestService} from "../../user/role-dto-rest.service";

@Component({
  selector: "app-role-edit",
  templateUrl: "./role-edit.component.html",
  styleUrls: ["./role-edit.component.scss"]
})
export class RoleEditComponent implements OnInit {

  public role: RoleDto = RoleDto.createEmpty();
  public roleId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public rest: RoleDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.role = RoleDto.createEmpty();
        this.roleId = this.role.id;
      } else {
        this.rest.get(+params["id"])
          .subscribe(
            t => {
              this.role = RoleDto.createWithId(t.id, t);
              this.roleId = this.role.id;
            },
            err => {
              console.log(`Could not get role with id ${params["id"]} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.roleId == null) {
      this.rest.add(new RoleDto(this.role))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save role: ${this.role.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(RoleDto.createWithId(this.roleId, this.role))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update role: ${this.role.id} with Error: ${err}`));
    }
  }
}
