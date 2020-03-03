import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddPageDialogComponent } from './add-page-dialog/add-page-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddPageDialogComponent],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule
  ],
  exports: [
    AddPageDialogComponent
  ]
})
export class DialogsModule { }
