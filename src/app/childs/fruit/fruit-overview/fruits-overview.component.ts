import {Component, OnInit} from '@angular/core';
import {IFruit} from '../../../entities/IFruit';
import {FruitTO} from '../../../TransferObjects/FruitTO';

@Component({
  selector: 'app-fruits-overview',
  templateUrl: './fruits-overview.component.html',
  styleUrls: ['./fruits-overview.component.scss']
})
export class FruitsOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getFruits(): IFruit[] {
    return [new FruitTO(1, 'Erdbeere'), new FruitTO(2, 'Himbeere')];
  }

}
