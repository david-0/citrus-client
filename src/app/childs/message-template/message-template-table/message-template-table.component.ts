import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageTemplateDto } from 'citrus-common';
import { BaseTableComponent } from '../../../base/base-table.component';
import { MessageTemplateDtoRestService } from '../message-template-dto-rest.service';
import { MessageTemplateSettingsService } from '../unit-of-measurement-settings.service';

@Component({
  selector: 'app-message-template-table',
  templateUrl: './message-template-table.component.html',
  styleUrls: ['./message-template-table.component.scss']
})
export class MessageTemplateTableComponent extends BaseTableComponent<MessageTemplateDto> implements AfterViewInit {

  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(rest: MessageTemplateDtoRestService, settings: MessageTemplateSettingsService) {
    super(rest, settings);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
