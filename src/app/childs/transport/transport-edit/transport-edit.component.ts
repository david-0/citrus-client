import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FruitDatabaseService} from '../fruit-database.service';
import {TransportDatabaseService} from '../transport-database.service';
import {ITransport} from '../../../entities/ITransport';
import {IFruitVolume} from '../../../entities/IFruitVolume';
import {IFruit} from '../../../entities/IFruit';
import {FruitVolumeTO} from '../../../TransferObjects/FruitVolumeTO';
import {TransportTO} from '../../../TransferObjects/TransportTO';

@Component({
  selector: 'app-transport-edit',
  templateUrl: './transport-edit.component.html',
  styleUrls: ['./transport-edit.component.scss']
})
export class TransportEditComponent implements OnInit {

  public transport: ITransport;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public fruitDatabase: FruitDatabaseService,
              public transportDatabase: TransportDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transportDatabase.get(+params['id'])
        .subscribe(
          t => {
            this.transport = TransportTO.deepcopyTransportForView(t, this.fruitDatabase.data);
          },
          err => {
            console.log(`Could not get transport with id ${params['id']} with error: ${err}`);
          });
    });
  }

  public submit() {
    this.transportDatabase.update(TransportTO.deepcopyTransportForPersistence(this.transport))
      .subscribe(
        (result) => this.router.navigate(['..'], {relativeTo: this.route}),
        (err) => console.error(`could not update transport: ${this.transport.id} with Error: ${err}`));
  }
}
