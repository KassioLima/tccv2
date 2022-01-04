import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './routes/home/home.component';
import {MenuRoutingModule} from "./menu-routing.module";

@NgModule({
  declarations: [
    // HomeComponent
  ],
  imports: [
    MenuRoutingModule
  ],
  exports: [
    MenuRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
