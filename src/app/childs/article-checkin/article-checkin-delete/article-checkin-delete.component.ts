import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ArticleCheckInDto} from "citrus-common";
import {DeleteExecutor} from "../../../base/delete-executor";
import {ArticleCheckInWithAllDtoRestService} from "../article-check-in-with-all-dto-rest.service";

@Component({
  selector: "app-article-checkin-delete",
  templateUrl: "./article-checkin-delete.component.html",
  styleUrls: ["./article-checkin-delete.component.scss"]
})
export class ArticleCheckinDeleteComponent implements OnInit {

  public deleteExecutor: DeleteExecutor<ArticleCheckInDto>;

  constructor(private route: ActivatedRoute,
              private rest: ArticleCheckInWithAllDtoRestService) {
  }

  ngOnInit() {
    this.deleteExecutor = new DeleteExecutor<ArticleCheckInDto>(this.route, this.rest, "Die Einbuchung");
    this.deleteExecutor.initDelete();
  }
}

