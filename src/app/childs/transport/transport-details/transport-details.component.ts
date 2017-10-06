import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransportDatabaseService} from '../transport-database.service';
import {ITransport} from '../../../entities/ITransport';
import {Observable} from 'rxjs/Observable';
import {TransportTO} from '../../../TransferObjects/TransportTO';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-transport-details',
  templateUrl: './transport-details.component.html',
  styleUrls: ['./transport-details.component.scss']
})
export class TransportDetailsComponent implements OnInit {
  private _transport: Observable<ITransport> = new BehaviorSubject<ITransport>(new TransportTO(111, new Date(), 'comment'));

  constructor(private route: ActivatedRoute, private database: TransportDatabaseService) {
  }

  public get transport() {
    return this._transport;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._transport = this.database.get(+params['id']);
    });
  }
}
