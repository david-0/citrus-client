import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderArchiveDto} from "citrus-common";
import {OrderArchiveDtoRestService} from "../order-archive-dto-rest.service";

@Component({
  selector: "app-order-archive-detail",
  templateUrl: "./order-archive-detail.component.html",
  styleUrls: ["./order-archive-detail.component.scss"]
})
export class OrderArchiveDetailComponent implements OnInit {
  private _orderArchive: OrderArchiveDto;

  constructor(private route: ActivatedRoute, private rest: OrderArchiveDtoRestService) {
  }

  public get orderArchive(): OrderArchiveDto {
    return this._orderArchive;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.get(+params["id"]).subscribe((orderArchive) => {
        this._orderArchive = orderArchive;
      });
    });
  }
}
