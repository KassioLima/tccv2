import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {PhaseOneComponent} from "./routes/capitulo1/phaseOne/phase-one.component";
import {ForbiddenComponent} from "../../core/http-codes/forbidden/forbidden.component";
import {UnavailableComponent} from "../../core/http-codes/unavailable/unavailable.component";
import {NotFoundComponent} from "../../core/http-codes/not-found/not-found.component";
import {CanDeactivateGuard} from "../../core/interfaces/guard";
import {PhaseTwoComponent} from "./routes/capitulo1/phaseTwo/phase-two.component";
import {PhaseThreeComponent} from "./routes/capitulo1/phaseThree/phase-three.component";

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
    path: 'phaseTwo',
    component: PhaseTwoComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'phaseThree',
    component: PhaseThreeComponent,
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
