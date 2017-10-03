import {Component, OnInit} from '@angular/core';
import {FruitDatabaseService} from '../fruit-database.service';
import {ITransport} from '../../../entities/ITransport';
import {TransportTO} from '../../../TransferObjects/TransportTO';
import {IFruitVolume} from '../../../entities/IFruitVolume';
import {FruitVolumeTO} from '../../../TransferObjects/FruitVolumeTO';
import {TransportDatabaseService} from '../transport-database.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-transport-create',
  templateUrl: './transport-create.component.html',
  styleUrls: ['./transport-create.component.scss']
})
export class TransportCreateComponent implements OnInit {

  public transport: ITransport;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public fruitDatabase: FruitDatabaseService,
              public transportDatabase: TransportDatabaseService) {
  }

  ngOnInit() {
    this.transport = new TransportTO(null, new Date(), null, this.createFruitVolumes());
  }

  public submit() {
    this.transport.fruitVolumes = this.processFruitVolumes(this.transport);
    this.transportDatabase.add(this.transport);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private createFruitVolumes(): IFruitVolume[] {
    return this.fruitDatabase.data.slice().map(f => new FruitVolumeTO(null, f, null, null));
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
