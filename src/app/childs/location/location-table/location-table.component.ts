import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LocationDto} from "citrus-common";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../../../base/base-table.component";
import {LocationDtoRestService} from "../location-dto-rest.service";
import {LocationSettingsService} from "../location-settings.service";

@Component({
  selector: "app-pickup-location-table",
  templateUrl: "./location-table.component.html",
  styleUrls: ["./location-table.component.scss"]
})
export class LocationTableComponent extends BaseTableComponent<LocationDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<LocationDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(rest: LocationDtoRestService, settings: LocationSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }
}
