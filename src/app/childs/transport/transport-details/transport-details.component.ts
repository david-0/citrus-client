import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ITransport} from "../../../entities/ITransport";
import {TransportTO} from "../../../TransferObjects/TransportTO";
import {TransportDatabaseService} from "../transport-database.service";

@Component({
  selector: "app-transport-details",
  templateUrl: "./transport-details.component.html",
  styleUrls: ["./transport-details.component.scss"]
})
export class TransportDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private database: TransportDatabaseService) {
  }

  private _transport: Observable<ITransport> = new BehaviorSubject<ITransport>(new TransportTO(111, new Date(), "comment"));

  public get transport() {
    return this._transport;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._transport = this.database.get(+params["id"]);
    });
  }
}
