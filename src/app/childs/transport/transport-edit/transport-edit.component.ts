import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ITransport} from "../../../entities/ITransport";
import {TransportTO} from "../../../TransferObjects/TransportTO";
import {FruitDatabaseService} from "../../fruit/fruit-database.service";
import {TransportDatabaseService} from "../transport-database.service";

@Component({
  selector: "app-transport-edit",
  templateUrl: "./transport-edit.component.html",
  styleUrls: ["./transport-edit.component.scss"]
})
export class TransportEditComponent implements OnInit {

  public transport: ITransport = new TransportTO(1, new Date("05/01/2000"), "a x 14");
  public transportId = -1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public fruitDatabase: FruitDatabaseService,
              public transportDatabase: TransportDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] == null) {
        TransportTO.createNewTransport(this.fruitDatabase.getAll()).subscribe((transport) => {
          this.transport = transport;
          this.transportId = this.transport.id;
        });
      } else {
        this.transportDatabase.get(+params["id"])
          .subscribe(
            t => {
              TransportTO.deepcopyTransportForView(t, this.fruitDatabase.getAll()).subscribe((transport) => {
                this.transport = transport;
                this.transportId = this.transport.id;
              });
            },
            err => {
              console.log(`Could not get transport with id ${params["id"]} with error: ${err}`);
            });
      }
    });
  }

  public submit() {
    if (this.transportId == null) {
      this.transportDatabase.add(TransportTO.deepcopyTransportForPersistence(this.transport))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not save transport: ${this.transport.id} with Error: ${err}`)
        );
    } else {
      this.transportDatabase.update(TransportTO.deepcopyTransportForPersistence(this.transport))
        .subscribe(
          (result) => this.router.navigate([".."], {relativeTo: this.route}),
          (err) => console.error(`could not update transport: ${this.transport.id} with Error: ${err}`));
    }
  }
}
