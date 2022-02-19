import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseOneComponent } from './routes/capitulo1/phaseOne/phase-one.component';
import {GameRoutingModule} from "./game-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {ModalModule} from "ngx-bootstrap/modal";
import {AceEditorModule} from "ng2-ace-editor";
import {LayoutModule} from "../../shared/layout/layout.module";
import {PhaseTwoComponent} from "./routes/capitulo1/phaseTwo/phase-two.component";

@NgModule({
  declarations: [
    PhaseOneComponent,
    PhaseTwoComponent
  ],
    imports: [
        GameRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ModalModule.forRoot(),
        AceEditorModule,
        LayoutModule,
    ],
  exports: [
    GameRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class GameModule { }
