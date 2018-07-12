import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {ArticleDtoRestService} from "../article-dto-rest.service";

@Component({
  selector: "app-article-delete",
  templateUrl: "./article-delete.component.html",
  styleUrls: ["./article-delete.component.scss"]
})
export class ArticleDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<ArticleDto>;

  constructor(private route: ActivatedRoute,
              private rest: ArticleDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<ArticleDto>(this.route, this.rest, "Der Artikel");
    this.deleteExecutor.initDelete();
  }
}
