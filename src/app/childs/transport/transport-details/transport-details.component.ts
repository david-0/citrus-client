import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transport-details',
  templateUrl: './transport-details.component.html',
  styleUrls: ['./transport-details.component.scss']
})
export class TransportDetailsComponent implements OnInit {
  private id: string;

  constructor(private route: ActivatedRoute) {
  }

  public get title() {
    return this.id;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      } else {
        this.id = 'keine ID angegeben'; // TODO: remove and log error
      }
    });
  }

}
