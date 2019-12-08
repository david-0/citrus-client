import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OrderArchiveDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {OrderArchiveDtoRestService} from "../order-archive-dto-rest.service";

@Component({
  selector: "app-order-archive-delete",
  templateUrl: "./order-archive-delete.component.html",
  styleUrls: ["./order-archive-delete.component.scss"]
})
export class OrderArchiveDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<OrderArchiveDto>;

  constructor(private route: ActivatedRoute,
              private rest: OrderArchiveDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<OrderArchiveDto>(this.route, this.rest, "Die archivierte Kundenbestellung");
    this.deleteExecutor.initDelete();
  }
}
