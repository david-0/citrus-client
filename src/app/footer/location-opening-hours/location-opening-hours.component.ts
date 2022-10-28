import { Component, OnInit } from '@angular/core';
import { LocationDto } from 'citrus-common';
import { BehaviorSubject } from 'rxjs';
import { LocationWithOpeninghHoursDtoRestService } from '../../childs/location/location-with-openingh-hours-dto-rest.service';

@Component({
  selector: 'app-location-opening-hours',
  templateUrl: './location-opening-hours.component.html',
  styleUrls: ['./location-opening-hours.component.scss']
})
export class LocationOpeningHoursComponent implements OnInit {

  public locations = new BehaviorSubject<LocationDto[]>([]);


  constructor(private rest: LocationWithOpeninghHoursDtoRestService) {
  }

  ngOnInit() {
    const subscription = this.rest.getAll().subscribe(data => {
      this.locations.next(data);
    });
  }

}
