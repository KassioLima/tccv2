import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnavailableComponent } from './unavailable/unavailable.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotFoundComponent,
    ForbiddenComponent,
    UnavailableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NotFoundComponent,
    ForbiddenComponent,
    UnavailableComponent,
  ],
})
export class HttpCodesModule { }
