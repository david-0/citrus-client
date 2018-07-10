import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDto} from "citrus-common";
import {BaseDeleteComponent} from "../../../base/base-delete.component";
import {ArticleDtoRestService} from "../article-dto-rest.service";

@Component({
  selector: "app-article-delete",
  templateUrl: "./article-delete.component.html",
  styleUrls: ["./article-delete.component.scss"]
})
export class ArticleDeleteComponent extends BaseDeleteComponent<ArticleDto> {

  constructor(route: ActivatedRoute,
              rest: ArticleDtoRestService) {
    super(route, rest, "Der Artikel");
  }

}
