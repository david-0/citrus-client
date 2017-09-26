import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transport-delete',
  templateUrl: './transport-delete.component.html',
  styleUrls: ['./transport-delete.component.scss']
})
export class TransportDeleteComponent implements OnInit {

  public id: string;

  constructor(private route: ActivatedRoute) {
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
