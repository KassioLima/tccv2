import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {RightSideBar} from "./right-sidebar/right-side-bar-component";
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
  ],
  declarations: [
    LayoutComponent,
    RightSideBar,
  ],
  exports: [
    LayoutComponent,
    RightSideBar
  ]
})
export class LayoutModule { }
