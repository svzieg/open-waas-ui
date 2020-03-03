import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  @Input() title: string

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }


  afterClosed(result) {
      console.log('The dialog was closed');
  }

   openDialog(modal: any, data): void {
    const dialogRef = this.dialog.open(modal, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe( this.afterClosed );
  }

}
