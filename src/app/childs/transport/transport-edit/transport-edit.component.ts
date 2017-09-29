import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FruitDatabaseService} from '../fruit-database.service';
import {TransportDatabaseService} from '../transport-database.service';
import {Observable} from 'rxjs/Observable';
import {ITransport} from '../../../entities/ITransport';
import {IFruitVolume} from '../../../entities/IFruitVolume';

@Component({
  selector: 'app-transport-edit',
  templateUrl: './transport-edit.component.html',
  styleUrls: ['./transport-edit.component.scss']
})
export class TransportEditComponent implements OnInit {

  public transport: Observable<ITransport>;
  public fruitVolumes: IFruitVolume[];

  constructor(private route: ActivatedRoute,
              public fruitDatabase: FruitDatabaseService,
              public transportDatabase: TransportDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.transport = this.transportDatabase.get(+params['id']);
      } else {
        console.error('keine ID angegeben');
      }
    });
  }
}
