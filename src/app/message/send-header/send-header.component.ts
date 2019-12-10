import {Component, Input, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-send-header",
  templateUrl: "./send-header.component.html",
  styleUrls: ["./send-header.component.scss"]
})
export class SendHeaderComponent implements OnInit {

  @Input() titleText: string;
  @Input() backLink: string;
  @Input() showBack: boolean;
  @Input() showSend: boolean;
  @Input() label: string;
  @Input() form: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate([this.backLink ? this.backLink : ".."], {relativeTo: this.route});
  }

  send() {
    // this.router.navigate(["create"], {relativeTo: this.route});
  }
}
