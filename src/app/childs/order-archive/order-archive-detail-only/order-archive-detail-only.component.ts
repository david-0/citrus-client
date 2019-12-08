import {Component, Input, OnInit} from "@angular/core";
import {OrderArchiveDto} from "citrus-common";

@Component({
  selector: "app-order-archive-detail-only",
  templateUrl: "./order-archive-detail-only.component.html",
  styleUrls: ["./order-archive-detail-only.component.scss"]
})
export class OrderArchiveDetailOnlyComponent implements OnInit {

  @Input() orderArchive: OrderArchiveDto;

  constructor() {
  }

  ngOnInit() {
  }
}
