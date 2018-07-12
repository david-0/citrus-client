import {Component, Input, OnInit} from "@angular/core";
import {OutputMessage} from "../../base/output-message";

@Component({
  selector: "app-error-output",
  templateUrl: "./error-output.component.html",
  styleUrls: ["./error-output.component.scss"]
})
export class ErrorOutputComponent implements OnInit {

  @Input() messages: OutputMessage;

  constructor() {
  }

  ngOnInit() {
  }

}
