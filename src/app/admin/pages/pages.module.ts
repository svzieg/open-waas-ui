import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';






import { OverviewPageComponent } from './overview-page/overview-page.component';



@NgModule({
  declarations: [OverviewPageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatFormFieldModule,
    OverviewPageComponent
  ],
  bootstrap: [OverviewPageComponent]
})
export class PagesModule { }
