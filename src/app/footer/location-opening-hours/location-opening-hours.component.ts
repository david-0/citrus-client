import { Component, OnInit } from '@angular/core';
import { LocationDto } from 'citrus-common';
import { BehaviorSubject } from 'rxjs';
import { LocationWithOpeninghHoursStocksAndArticleDtoRestService } from '../../childs/location/location-with-openingh-hours-stocks-and-article-dto-rest.service';

@Component({
  selector: 'app-location-opening-hours',
  templateUrl: './location-opening-hours.component.html',
  styleUrls: ['./location-opening-hours.component.scss']
})
export class LocationOpeningHoursComponent implements OnInit {

  public locations = new BehaviorSubject<LocationDto[]>([]);


  constructor(private rest: LocationWithOpeninghHoursStocksAndArticleDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(locations => {
      const visibleLocations = locations //
        .filter(location => {
          return location.articleStocks //
            .filter(stock => stock.article.inSale && stock.visible)
            .length > 0;
        });
      this.locations.next(visibleLocations);
    })
  };
}
