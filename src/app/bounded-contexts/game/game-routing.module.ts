import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {PhaseOneComponent} from "./routes/phaseOne/phase-one.component";
import {ForbiddenComponent} from "../../core/http-codes/forbidden/forbidden.component";
import {UnavailableComponent} from "../../core/http-codes/unavailable/unavailable.component";
import {NotFoundComponent} from "../../core/http-codes/not-found/not-found.component";
import {CanDeactivateGuard} from "../../core/interfaces/guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'phaseOne'
  },
  {
    path: 'phaseOne',
    component: PhaseOneComponent,
    canDeactivate: [CanDeactivateGuard]
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
