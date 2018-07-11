import {OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DtoId} from "citrus-common/lib/dto-old/dto-id";
import {GenericRestService} from "../table-support/generic-rest.service";

export class BaseDeleteComponent<T extends DtoId> implements OnInit {

  public message: string;

  constructor(protected route: ActivatedRoute,
              public rest: GenericRestService<T>,
              public dtoName: string) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.del(+params["id"])
        .subscribe(
          t => {
            this.message = `Die ${this.dtoName} wurde gelöscht!`;
          },
          err => {
            this.message = `Die ${this.dtoName} konnte nicht gelöscht werden (Error: ${err.error}).`;
          });
    });
  }
}
