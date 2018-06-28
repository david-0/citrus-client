import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {EArticleStatus} from "citrus-common/lib/entity/e-article-status";

@Component({
  selector: "app-status-edit",
  templateUrl: "./status-edit.component.html",
  styleUrls: ["./status-edit.component.scss"]
})
export class StatusEditComponent implements OnInit {

  private statusValue: EArticleStatus;

  @Input()
  get status() {
    return this.statusValue;
  }

  @Output() statusChange = new EventEmitter<EArticleStatus>();

  set status(status: EArticleStatus) {
    this.statusValue = status;
    this.statusChange.emit(this.statusValue);
  }

  public allStatus = [
    {key: EArticleStatus.created, viewValue: "nicht freigegeben"},
    {key: EArticleStatus.inSale, viewValue: "im Verkauf"},
    {key: EArticleStatus.soldOut, viewValue: "ausverkauft / nicht mehr im Verkauf"},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
