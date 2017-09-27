import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transport-details',
  templateUrl: './transport-details.component.html',
  styleUrls: ['./transport-details.component.scss']
})
export class TransportDetailsComponent implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      } else {
        console.error('keine ID angegeben');
      }
    });
  }
}
