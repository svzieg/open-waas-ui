import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticPageComponent } from './static-page/static-page.component';

import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [StaticPageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule
  ]
})
export class PagesModule { }
