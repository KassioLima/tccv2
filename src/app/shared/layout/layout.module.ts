import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  providers: [
  ],
  declarations: [
    LayoutComponent,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
