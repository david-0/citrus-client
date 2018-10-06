import {HttpErrorResponse} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressDto, UserDto} from "citrus-common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {UserDtoRestService} from "../../user/user-dto-rest.service";
import {AddressWithUserDtoRestService} from "../address-with-user-dto-rest.service";

@Component({
  selector: "app-address-edit",
  templateUrl: "./address-edit.component.html",
  styleUrls: ["./address-edit.component.scss"]
})
export class AddressEditComponent implements OnInit {

  public address: AddressDto = AddressDto.createEmpty();
  public addressID: number;

  public userInfoSubject: BehaviorSubject<UserDto[]> = new BehaviorSubject([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private addressRestWithUsers: AddressWithUserDtoRestService,
              public userRest: UserDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        this.addressID = this.address.id;
        const userObservable: Observable<UserDto[]> = this.userRest.getAll();
        userObservable.subscribe(users => {
          this.userInfoSubject.next(users);
        });
      } else {
        const userObservable: Observable<UserDto[]> = this.userRest.getAll();
        const addressObservable = this.addressRestWithUsers.get(+params["id"]);
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

  private ensureUserInAddress(address: AddressDto, users: UserDto[]): AddressDto {
    this.userInfoSubject.next(users);
    for (const user of users) {
      if (this.isUserWithSameId(address, user)) {
        address.user = user;
      }
    }
    return address;
  }

  private isUserWithSameId(address: AddressDto, user: UserDto): boolean {
    return address.user != null && address.user.id === user.id;
  }

  public submit() {
    if (this.addressID == null) {
      this.addressRestWithUsers.add(new AddressDto(this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not save address: ${this.address.id} with Error: ${err.message}`)
        );
    } else {
      this.addressRestWithUsers.update(AddressDto.createWithId(this.addressID, this.address))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err: HttpErrorResponse) => console.error(`could not update address: ${this.address.id} with Error: ${err.message}`));
    }
  }
}
