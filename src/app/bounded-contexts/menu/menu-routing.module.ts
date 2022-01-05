import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from "./routes/home/home.component";
import {ForbiddenComponent} from "../../core/http-codes/forbidden/forbidden.component";
import {UnavailableComponent} from "../../core/http-codes/unavailable/unavailable.component";
import {NotFoundComponent} from "../../core/http-codes/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
export class MenuRoutingModule { }
