import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpCodesModule } from './http-codes/http-codes.module';
import {CanDeactivateComponent} from "./components/can-deactivate.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpCodesModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }
