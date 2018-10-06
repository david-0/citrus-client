import {Component, OnInit} from "@angular/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto} from "citrus-common";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import * as moment from "moment";
import {Moment} from "moment";
import {LocationWithOpeninghHoursDtoRestService} from "../../location/location-with-openingh-hours-dto-rest.service";
import {OpeningHourDtoRestService} from "../opening-hour-dto-rest.service";

@Component({
  selector: "app-opening-hour-edit",
  templateUrl: "./opening-hour-edit.component.html",
  styleUrls: ["./opening-hour-edit.component.scss"],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: "de-CH"},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class OpeningHourEditComponent implements OnInit {

  private _Location: LocationDto = LocationDto.createEmpty();
  private _openingHour: OpeningHourDto = OpeningHourDto.createEmpty(this._Location);

  public _openingHourId: number;
  public dateForPicker: Moment;
  public fromTime: string;
  public toTime: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: LocationWithOpeninghHoursDtoRestService,
              private openingHourRest: OpeningHourDtoRestService) {
  }

  get openingHour(): OpeningHourDto {
    return this._openingHour;
  }

  ngOnInit() {
    this.route.parent.params.subscribe(locationParams => {
      const promise = this.rest.get(+locationParams["id"]);
      promise.subscribe((pickupLocation) => {
        this._Location = pickupLocation;
        this.route.params.subscribe(openingHourParams => {
          if (openingHourParams["id"] == null) {
            this._openingHour = OpeningHourDto.createEmpty(this._Location);
          } else {
            this._openingHour = this._Location.openingHours.filter(o => o.id === +openingHourParams["id"])[0];
          }
          this._openingHourId = this._openingHour.id;
          this.dateForPicker = moment(this._openingHour.fromDate);
          this.fromTime =  this.dateForPicker.format("HH:mm");
          this.toTime = moment(this._openingHour.toDate).format("HH:mm");
        });
      });
    });
  }

  public submit() {
    this.updateDates();
    const copy = OpeningHourDto.createWithId(this._openingHourId, this.openingHour);
    if (this._openingHourId == null) {
      this.openingHourRest.add(new OpeningHourDto(copy)).subscribe(
        (result) => {
          this._Location.openingHours.push(copy);
          this.router.navigate([".."], {relativeTo: this.route});
        },
        (err) => console.error(`could not save openingHour: ${copy.id} with Error: ${err}`)
      );
    } else {
      this.openingHourRest.update(copy).subscribe(
        (result) => {
          const position = this._Location.openingHours.findIndex(o => o.id === this._openingHourId);
          this._Location.openingHours[position] = copy;
          this.router.navigate([".."], {relativeTo: this.route});
        },
        (err) => console.error(`could not update pickupLocation: ${copy.id} with Error: ${err}`));
    }
  }

  private updateDates() {
    const fromTime = moment(this.fromTime, "h:mm");
    const toTime = moment(this.toTime, "h:mm");
    this.dateForPicker.hour(fromTime.hour());
    this.dateForPicker.minute(fromTime.minute());
    this._openingHour.fromDate = this.dateForPicker.toDate();
    this.dateForPicker.hour(toTime.hour());
    this.dateForPicker.minute(toTime.minute());
    this._openingHour.toDate = this.dateForPicker.toDate();
  }
}
