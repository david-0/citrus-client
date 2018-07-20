import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto, UserInfoDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {UserInfoDtoRestService} from "../../user/user-info-dto-rest.service";
import {AddressDtoRestService} from "../address-dto-rest.service";

@Component({
  selector: "app-address-edit",
  templateUrl: "./address-edit.component.html",
  styleUrls: ["./address-edit.component.scss"]
})
export class AddressEditComponent implements OnInit {

  public address: AddressDto = AddressDto.createEmpty();
  public addressID: number;

  public userInfoSubject: BehaviorSubject<UserInfoDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: AddressDtoRestService,
              public userInfoRest: UserInfoDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.addressID = this.address.id;
        const userObservable: Observable<UserInfoDto[]> = this.userInfoRest.getAll();
        userObservable.subscribe(users => {
          this.userInfoSubject.next(users);
        });
      } else {
        const userObservable: Observable<UserInfoDto[]> = this.userInfoRest.getAll();
        const addressObservable = this.rest.get(+params["id"]);
        combineLatest(addressObservable, userObservable).subscribe(result => {
            this.address = this.ensureUserInAddress(result[0], result[1]);
            this.addressID = this.address.id;
          },
          err => {
            console.log(`Could not get address with id ${params["id"]} with error: ${err}`);
          });
      }
    });
  }

  private ensureUserInAddress(address: AddressDto, users: UserInfoDto[]): AddressDto {
    this.userInfoSubject.next(users);
    for (const user of users) {
      if (this.isUserWithSameId(address, user)) {
        address.user = user;
      }
    }
    return address;
  }

  private isUserWithSameId(address: AddressDto, user: UserInfoDto): boolean {
    return address.userId === user.id ||
      (address.user != null && address.user.id === user.id);
  }

  public submit() {
    this.address.userId = this.address.user.id;
    if (this.addressID == null) {
      this.rest.add(new AddressDto(this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save address: ${this.address.id} with Error: ${err}`)
        );
    } else {
      this.rest.update(AddressDto.createWithId(this.addressID, this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update address: ${this.address.id} with Error: ${err}`));
    }
  }
}
