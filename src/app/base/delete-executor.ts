import {ActivatedRoute, Params} from "@angular/router";
import {DtoId} from "citrus-common/lib/dto/dto-id";
import {GenericRestService} from "../table-support/generic-rest.service";
import {OutputMessage} from "./output-message";

export class DeleteExecutor<T extends DtoId> implements OutputMessage {
  private checks: { checkCallback: (item: T) => boolean, messageCallback: (item: T) => string }[] = [];
  private defaultErrorMessage: string;

  public message: string;
  public details: string[] = [];

  constructor(private route: ActivatedRoute,
              private rest: GenericRestService<T>,
              private messagePrefix: string) {
    this.defaultErrorMessage = `${messagePrefix} konnte nicht gelöscht werden.`;
  }

  public registerCheck(checkCallback: (item: T) => boolean, messageCallback: (item: T) => string) {
    this.checks.push({checkCallback, messageCallback});
  }

  public initDelete(): void {
    const errorMessages: string[] = [];
    this.route.params.subscribe(params => {
      if (this.checks.length > 0) {
        this.rest.get(+params["id"]).subscribe(item => {
          this.checks.forEach(check => {
            if (check.checkCallback(item)) {
              errorMessages.push(check.messageCallback(item));
            }
          });
          if (errorMessages.length > 0) {
            this.message = this.defaultErrorMessage;
            this.details = errorMessages;
          } else {
            this.deleteItem(params);
          }
        }, error => this.showError(error));
      } else {
        this.deleteItem(params);
      }
    });
  }

  private deleteItem(params: Params) {
    this.rest.del(+params["id"])
      .subscribe(
        t => {
          this.message = `${this.messagePrefix} wurde gelöscht!`;
        },
        err => this.showError(err));
  }

  private showError(err) {
    this.message = this.defaultErrorMessage;
    this.details.push(`Error: ${err.error.error}.`);
  }

}
