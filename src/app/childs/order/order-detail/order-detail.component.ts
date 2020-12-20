import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {OrderDtoWithAllRestService} from "../order-dto-with-all-rest.service";
import {ConfirmationRestService} from "../confirmation-rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
  private _order: OrderDto = OrderDto.createEmpty();

  constructor(private router: Router, private route: ActivatedRoute, private rest: OrderDtoWithAllRestService,
              private resendRest: ConfirmationRestService, private _snackBar: MatSnackBar) {
  }

  public get order(): OrderDto {
    return this._order;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.get(+params["id"]).subscribe((order) => {
        this._order = order;
      });
    });
  }

  public resendConfirmation() {
    this.resendRest.resend(this._order.id).subscribe((result) => {
      if (result) {
        this._snackBar.open("Bestellbestätigung", "erfolgreich versandt", {
          duration: 2000,
        });
        this.router.navigate([".."], {relativeTo: this.route});
      } else {
        this._snackBar.open("Bestellbestätigung", "konnte nicht versendet werden", {
          duration: 2000,
        });
      }
    });
  }
}
