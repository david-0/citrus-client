import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {OkCancelDialogComponent} from '../ok-cancel-dialog/ok-cancel-dialog.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() titleText: string;
  @Input() backLink: string;
  @Input() showBack: boolean;
  @Input() showCreate: boolean;
  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showCancelAndSave: boolean;
  @Input() label: string;
  @Input() form: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate([this.backLink ? this.backLink : '..'], {relativeTo: this.route});
  }

  create() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  edit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  delete() {
    const dialogRef = this.dialog.open(OkCancelDialogComponent, {
      data: {label: this.label}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['delete'], {relativeTo: this.route});
      }
    });
  }
}
