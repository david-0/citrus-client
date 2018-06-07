import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {Observable} from "rxjs/Rx";
import {BaseTableComponent} from "../../../base/base-table.component";
import {PickupLocationDtoService} from "../pickup-location-dto.service";
import {PickupLocationSettingsService} from "../pickup-location-settings.service";

@Component({
  selector: "app-pickup-location-table",
  templateUrl: "./pickup-location-table.component.html",
  styleUrls: ["./pickup-location-table.component.scss"]
})
export class PickupLocationTableComponent extends BaseTableComponent<PickupLocationDto> implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataObservable: Observable<PickupLocationDto[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(rest: PickupLocationDtoService, settings: PickupLocationSettingsService) {
    super(rest, settings);
  }

  ngOnInit() {
    this.dataObservable.subscribe(data => {
      this.datasource.data = data;
    });
  }
}
