import {Component, OnInit} from '@angular/core';
import {IFruit} from '../../../entities/IFruit';
import {FruitTO} from '../../../TransferObjects/FruitTO';

@Component({
  selector: 'app-fruit-overview',
  templateUrl: './fruit-overview.component.html',
  styleUrls: ['./fruit-overview.component.scss']
})
export class FruitOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getFruits(): IFruit[] {
    return [new FruitTO(1, 'Erdbeere'), new FruitTO(2, 'Himbeere')];
  }

}
