import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseOneComponent } from './routes/phaseOne/phase-one.component';
import {GameRoutingModule} from "./game-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {ModalModule} from "ngx-bootstrap/modal";
import {AceEditorModule} from "ng2-ace-editor";
import {SimplebarAngularModule} from "simplebar-angular";

@NgModule({
  declarations: [
    PhaseOneComponent
  ],
  imports: [
    SimplebarAngularModule,
    GameRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AceEditorModule,
  ],
  exports: [
    GameRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class GameModule { }
