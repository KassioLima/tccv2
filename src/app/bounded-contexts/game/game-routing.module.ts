import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {GameComponent} from "./routes/game/game.component";
import {ForbiddenComponent} from "../../core/http-codes/forbidden/forbidden.component";
import {UnavailableComponent} from "../../core/http-codes/unavailable/unavailable.component";
import {NotFoundComponent} from "../../core/http-codes/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
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
