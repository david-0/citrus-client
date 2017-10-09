import {Component, OnInit, ViewChild} from '@angular/core';
import {IFruit} from '../../../entities/IFruit';
import {MdPaginator, MdSort} from '@angular/material';
import {GenericPagedDataSource} from '../../../table-support/generic-paged-data-source';
import {FruitDatabaseService} from '../fruit-database.service';
import {FruitSettingsService} from '../fruit-settings.service';

@Component({
  selector: 'app-fruit-overview',
  templateUrl: './fruit-overview.component.html',
  styleUrls: ['./fruit-overview.component.scss']
})
export class FruitOverviewComponent implements OnInit {
  public displayedColumns = ['name'];

  public dataSource: GenericPagedDataSource<IFruit> | null;

  constructor(private database: FruitDatabaseService, public settings: FruitSettingsService) {
  }

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.dataSource = new GenericPagedDataSource(this.database, this.paginator, this.sort, this.settings);
    this.paginator.page.subscribe(event => {
      this.settings.pageIndex = event.pageIndex;
      this.settings.pageSize = event.pageSize;
    });
  }

  public onFilterChange(filter: string) {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filter;
  }
}
