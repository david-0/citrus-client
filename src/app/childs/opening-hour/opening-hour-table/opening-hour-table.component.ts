import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {BehaviorSubject} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: "app-opening-hour-table",
  templateUrl: "./opening-hour-table.component.html",
  styleUrls: ["./opening-hour-table.component.scss"]
})
export class OpeningHourTableComponent extends BaseTableComponent<OpeningHourDto> implements OnInit, AfterViewInit {

  @Input() dataObservable: BehaviorSubject<OpeningHourDto[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public displayedColumns = ["date", "from", "to"];

  constructor() {
    super(null, null);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
