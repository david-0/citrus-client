import {OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DtoId} from "citrus-common/lib/dto-old/dto-id";
import {GenericRestService} from "../table-support/generic-rest.service";

export class BaseDeleteComponent<T extends DtoId> implements OnInit {

  public message: string;
  private checks: { checkCallback: (item: T) => boolean, errorMessage: string }[] = [];

  constructor(protected route: ActivatedRoute,
              public rest: GenericRestService<T>,
              public dtoName: string) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.checks.length > 0) {
        this.rest.get(+params["id"]).subscribe(item => {
          this.checks.forEach(check => {
            if (check.checkCallback(item)) {
              this.message = check.errorMessage;
            }
          });
          if (!this.message) {
            this.deleteItem(params);
          }
        }, error => this.showError(error));
      } else {
        this.deleteItem(params);
      }
    });
  }

  private deleteItem(params) {
    this.rest.del(+params["id"])
      .subscribe(
        t => {
          this.message = `${this.dtoName} wurde gelöscht!`;
        },
        err => this.showError(err));
  }

  private showError(err) {
    this.message = `${this.dtoName} konnte nicht gelöscht werden (Error: ${err.error.error}).`;
  }

  protected registerCheckEmpty(checkCallback: (item: T) => boolean, errorMessage: string) {
    this.checks.push({checkCallback, errorMessage});
  }

}
