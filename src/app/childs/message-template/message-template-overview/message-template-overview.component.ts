import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-template-overview',
  templateUrl: './message-template-overview.component.html',
  styleUrls: ['./message-template-overview.component.scss']
})
export class MessageTemplateOverviewComponent implements OnInit {
  public displayedColumns = ["subject", "content"];

  constructor() {
  }

  ngOnInit() {
  }
}
