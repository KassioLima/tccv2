import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseOneComponent } from './routes/phaseOne/phase-one.component';
import {GameRoutingModule} from "./game-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    PhaseOneComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  exports: [
    GameRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class GameModule { }
