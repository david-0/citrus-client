import {Component, Input, OnInit} from "@angular/core";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {BehaviorSubject} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";

@Component({
  selector: "app-opening-hour-table",
  templateUrl: "./opening-hour-table.component.html",
  styleUrls: ["./opening-hour-table.component.scss"]
})
export class OpeningHourTableComponent extends BaseTableComponent<OpeningHourDto> implements OnInit{

  @Input() dataObservable: BehaviorSubject<OpeningHourDto[]>;
  public displayedColumns = ["date", "from", "to"];

  constructor() {
    super(null, null);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }
}
