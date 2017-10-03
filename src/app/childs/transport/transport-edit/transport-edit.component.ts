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
      if (params['id']) {
        this.transportDatabase.get(+params['id']).subscribe(t => {
          const extendedFruitVolumes = this.fruitDatabase.data.slice()
            .map(fruit => this.createNewFruitVolume(fruit, t.fruitVolumes));
          this.transport = new TransportTO(t.id, t.departureDate, t.comment, extendedFruitVolumes);
        });
      } else {
        console.error('keine ID angegeben');
      }
    });
  }

  public submit() {
    this.transport.fruitVolumes = this.processFruitVolumes(this.transport);
    this.transportDatabase.update(this.transport);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private createNewFruitVolume(value: IFruit, fruitVolumes?: IFruitVolume[]): IFruitVolume {
    const existing = fruitVolumes.filter(fruitVolume => fruitVolume.fruit.id === value.id);
    return (existing.length === 1)
      ? new FruitVolumeTO(existing[0].id, existing[0].fruit, existing[0].transport, existing[0].weightInKg)
      : new FruitVolumeTO(null, value, null, null);
  }

  private processFruitVolumes(transport: ITransport): IFruitVolume[] {
    const result: IFruitVolume[] = [];
    transport.fruitVolumes.forEach(fruitVolume => {
      if (fruitVolume.weightInKg != null) {
        fruitVolume.weightInKg = +fruitVolume.weightInKg;
        if (fruitVolume.weightInKg > 0) {
          if (fruitVolume.transport) {
            fruitVolume.transport = transport;
          }
          result.push(fruitVolume);
        }
      }
    });
    return result;
  }
}
