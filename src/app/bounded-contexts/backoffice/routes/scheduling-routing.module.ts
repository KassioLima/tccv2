import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "src/app/shared/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scheduling'
  },
  {
    path: 'scheduling',
    component: LayoutComponent,
    loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingRoutingModule { }
