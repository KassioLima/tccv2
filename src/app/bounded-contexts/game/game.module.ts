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
import {PhaseThreeComponent} from "./routes/capitulo1/phaseThree/phase-three.component";
import {PhaseFourComponent} from "./routes/capitulo1/phaseFour/phase-four.component";
import {PhaseFiveComponent} from "./routes/capitulo1/phaseFive/phase-five.component";

@NgModule({
  declarations: [
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    PhaseFourComponent,
    PhaseFiveComponent,
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
