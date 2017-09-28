import {Component, OnInit} from '@angular/core';
import {FruitDatabaseService} from '../fruit-database.service';

@Component({
  selector: 'app-transport-create',
  templateUrl: './transport-create.component.html',
  styleUrls: ['./transport-create.component.scss']
})
export class TransportCreateComponent implements OnInit {

  constructor(public database: FruitDatabaseService) { }

  ngOnInit() {
  }

}
