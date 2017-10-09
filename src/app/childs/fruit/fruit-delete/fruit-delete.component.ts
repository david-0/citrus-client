import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FruitDatabaseService} from '../fruit-database.service';

@Component({
  selector: 'app-fruit-delete',
  templateUrl: './fruit-delete.component.html',
  styleUrls: ['./fruit-delete.component.scss']
})
export class FruitDeleteComponent implements OnInit {

  public id: string;
  public message: string;

  constructor(private route: ActivatedRoute,
              public fruitDatabase: FruitDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fruitDatabase.remove(+params['id'])
        .subscribe(
          t => {
            this.message = `Die Frucht wurde gelöscht!`;
          },
          err => {
            this.message = `Die Frucht konnte nicht gelöscht werden (Error: ${err}).`;
          });
    });
  }
}
