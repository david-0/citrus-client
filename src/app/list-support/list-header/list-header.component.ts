import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MdDialog} from '@angular/material';
import {OkCancelDialogComponent} from '../ok-cancel-dialog/ok-cancel-dialog.component';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Input() titleText: string;
  @Input() backLink: string;
  @Input() showBack: boolean;
  @Input() showCreate: boolean;
  @Input() showEdit: boolean;
  @Input() showDelete: boolean;
  @Input() showCancelAndSave: boolean;
  @Input() id: number;
  @Input() label: string;

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
      data: {id: this.id, label: this.label}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.router.navigate(['deleted'], {relativeTo: this.route});
      }
    });
  }
}
