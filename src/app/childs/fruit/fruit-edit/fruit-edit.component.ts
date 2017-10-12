import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IFruit} from '../../../entities/IFruit';
import {FruitDatabaseService} from '../fruit-database.service';
import {FruitTO} from '../../../TransferObjects/FruitTO';

@Component({
  selector: 'app-fruit-edit',
  templateUrl: './fruit-edit.component.html',
  styleUrls: ['./fruit-edit.component.scss']
})
export class FruitEditComponent implements OnInit {


  public fruit: IFruit = new FruitTO('');
  public fruitId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public fruitDatabase: FruitDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] == null) {
        this.fruit = new FruitTO('');
        this.fruitId = this.fruit.id;
      } else {
        this.fruitDatabase.get(+params['id'])
          .subscribe(
            t => {
              this.fruit = FruitTO.createFruitWithId(t.id, t.name);
              this.fruitId = this.fruit.id;
            },
            err => {
              console.log(`Could not get fruit with id ${params['id']} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.fruitId == null) {
      this.fruitDatabase.add(new FruitTO(this.fruit.name))
        .subscribe(
          (result) => this.router.navigate(['..'], {relativeTo: this.route}),
          (err) => console.error(`could not save fruit: ${this.fruit.id} with Error: ${err}`)
        );
    } else {
      this.fruitDatabase.update(FruitTO.createFruitWithId(this.fruitId, this.fruit.name))
        .subscribe(
          (result) => this.router.navigate(['..'], {relativeTo: this.route}),
          (err) => console.error(`could not update fruit: ${this.fruit.id} with Error: ${err}`));
    }
  }
}
