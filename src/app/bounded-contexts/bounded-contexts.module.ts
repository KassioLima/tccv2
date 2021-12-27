import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForbiddenComponent } from "../core/http-codes/forbidden/forbidden.component";
import { NotFoundComponent } from "../core/http-codes/not-found/not-found.component";
import { UnavailableComponent } from "../core/http-codes/unavailable/unavailable.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'backoffice'
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule),
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  }, {
    path: 'unavailable',
    component: UnavailableComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
