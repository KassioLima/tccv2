import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './routes/home/home.component';
import {MenuRoutingModule} from "./menu-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {ModalModule} from "ngx-bootstrap/modal";
import {UserService} from "./services/menu/user.service";
import {AttemptsService} from "../game/services/attempts.service";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MenuRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  exports: [
    MenuRoutingModule
  ],
  providers: [
    AttemptsService,
    UserService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MenuModule { }
