import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulingListComponent } from './scheduling-list/scheduling-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  { path: 'list', component: SchedulingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingModelRoutingModule { }
