import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleCheckInDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {ArticleCheckoutWithAllDtoRestService} from "../article-checkout-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkout-delete",
  templateUrl: "./article-checkout-delete.component.html",
  styleUrls: ["./article-checkout-delete.component.scss"]
})
export class ArticleCheckoutDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<ArticleCheckInDto>;

  constructor(private route: ActivatedRoute,
              private rest: ArticleCheckoutWithAllDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<ArticleCheckInDto>(this.route, this.rest, "Die Ausbuchung");
    this.deleteExecutor.initDelete();
  }
}

