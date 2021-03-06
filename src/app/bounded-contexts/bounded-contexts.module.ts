import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForbiddenComponent } from "../core/http-codes/forbidden/forbidden.component";
import { NotFoundComponent } from "../core/http-codes/not-found/not-found.component";
import { UnavailableComponent } from "../core/http-codes/unavailable/unavailable.component";
import {PhasesGuard} from "../core/interfaces/phasesGuard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule),
    canActivate: [PhasesGuard],
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
