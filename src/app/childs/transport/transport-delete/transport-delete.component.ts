import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TransportDatabaseService} from "../transport-database.service";

@Component({
  selector: "app-transport-delete",
  templateUrl: "./transport-delete.component.html",
  styleUrls: ["./transport-delete.component.scss"]
})
export class TransportDeleteComponent implements OnInit {

  public id: string;
  public message: string;

  constructor(private route: ActivatedRoute,
              public transportDatabase: TransportDatabaseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transportDatabase.remove(+params["id"])
        .subscribe(
          t => {
            this.message = `Der Transport wurde gelöscht!`;
          },
          err => {
            this.message = `Der Transport konnte nicht gelöscht werden (Error: ${err}).`;
          });
    });
  }
}
