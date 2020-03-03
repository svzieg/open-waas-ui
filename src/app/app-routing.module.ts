import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PostListComponent} from './post-list/post-list.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {OverviewPageComponent} from './admin/pages/overview-page/overview-page.component'


const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: '', component: DashboardComponent },
  { path: 'pages', component: OverviewPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
