import {Component, Input, OnInit} from "@angular/core";
import {OutputMessage} from "../../base/output-message";

@Component({
  selector: "app-output-message",
  templateUrl: "./output-message.component.html",
  styleUrls: ["./output-message.component.scss"]
})
export class OutputMessageComponent implements OnInit {

  @Input() messages: OutputMessage;

  constructor() {
  }

  ngOnInit() {
  }

}
