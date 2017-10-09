import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IFruit} from '../../../entities/IFruit';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FruitTO} from '../../../TransferObjects/FruitTO';
import {ActivatedRoute} from '@angular/router';
import {FruitDatabaseService} from '../fruit-database.service';

@Component({
  selector: 'app-fruit-details',
  templateUrl: './fruit-details.component.html',
  styleUrls: ['./fruit-details.component.scss']
})
export class FruitDetailsComponent implements OnInit {
  private _fruit: Observable<IFruit> = new BehaviorSubject<IFruit>(new FruitTO(111, 'noName'));

  constructor(private route: ActivatedRoute, private database: FruitDatabaseService) {
  }

  public get fruit() {
    return this._fruit;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._fruit = this.database.get(+params['id']);
    });
  }


}
