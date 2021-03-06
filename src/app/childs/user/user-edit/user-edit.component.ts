import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserDto} from "citrus-common";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {zip} from "rxjs";
import {RoleDtoRestService} from "../role-dto-rest.service";
import {UserWithRolesDtoRestService} from "../user-with-roles-dto-rest.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {

  public userInfo: UserDto = UserDto.createEmpty();
  private _roles: { role: RoleDto, checked: boolean }[] = [];
  public userInfoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: UserWithRolesDtoRestService,
              private roleRest: RoleDtoRestService) {
  }

  public get rolePairs(): { role: RoleDto, checked: boolean }[] {
    return this._roles;
  }

  ngOnInit() {
    const roles$ = this.roleRest.getAll();
    zip(roles$, this.route.params).subscribe((result) => {
      const roles: RoleDto[] = result[0];
      const params: Params = result[1];
      if (params["id"] == null) {
        this._roles = this.createRolePairs(roles, []);
        this.userInfo = UserDto.createEmpty();
        this.userInfoId = this.userInfo.id;
      } else {
        this.rest.get(+params["id"]).subscribe(
          t => {
            this.userInfo = UserDto.createWithId(t.id, t);
            this.userInfoId = this.userInfo.id;
            this._roles = this.createRolePairs(roles, t.roles);
          },
          err => {
            console.log(`Could not get address with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private createRolePairs(rolesAvailable: RoleDto[], userRoles: RoleDto[]): { role: RoleDto, checked: boolean }[] {
    return rolesAvailable.map(r => ({role: r, checked: this.containsRole(userRoles, r)}));
  }

  private containsRole(roles: RoleDto[], roleToFind: RoleDto): boolean {
    return roles.findIndex(role => role.id === roleToFind.id) >= 0;
  }

  private getSelectedRoles(rolePairs: { role: RoleDto, checked: boolean }[]): RoleDto[] {
    return rolePairs.filter(rp => rp.checked).map(rp => rp.role);
  }

  public submit() {
    this.userInfo.roles = this.getSelectedRoles(this.rolePairs);
    if (this.userInfoId == null) {
      this.rest.add(new UserDto(this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save userInfo: ${this.userInfo.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(UserDto.createWithId(this.userInfoId, this.userInfo))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update userInfo: ${this.userInfo.id} with Error: ${err.error}`));
    }
  }
}
