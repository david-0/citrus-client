import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto} from "citrus-common";

@Component({
  selector: "app-sale-header",
  templateUrl: "./sale-header.component.html",
  styleUrls: ["./sale-header.component.scss"]
})
export class SaleHeaderComponent implements OnInit {
  @Input() titleText: string;
  @Input() showBack: boolean;
  @Input() showLocationLabel: boolean;
  @Input() orderCount: number;
  @Input() selectedLocation: LocationDto;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate([".."], {relativeTo: this.route});
  }
}
