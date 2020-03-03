import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from './modals/modals.module';
import { DialogsModule } from './dialogs/dialogs.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {PagesModule} from './pages/pages.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalsModule,
    DialogsModule,
    MatFormFieldModule,
    PagesModule
  ],
  exports: [
    PagesModule,
    ModalsModule,
    DialogsModule
  ]
})
export class AdminModule { }
