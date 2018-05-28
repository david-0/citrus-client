import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleDtoRestService} from "../article-dto-rest.service";

@Component({
  selector: "app-article-delete",
  templateUrl: "./article-delete.component.html",
  styleUrls: ["./article-delete.component.scss"]
})
export class ArticleDeleteComponent implements OnInit {

  public id: string;
  public message: string;

  constructor(private route: ActivatedRoute,
              public rest: ArticleDtoRestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.del(+params["id"])
        .subscribe(
          t => {
            this.message = `Dieser Artikel wurde gelöscht!`;
          },
          err => {
            this.message = `Dieser Artikel konnte nicht gelöscht werden (Error: ${err}).`;
          });
    });
  }

}
